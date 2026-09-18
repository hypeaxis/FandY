import { useRef, useEffect } from 'react';

export default function FundingRateChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data || data.length === 0) return;

    const container = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Layout
    const padLeft = 50;
    const padRight = 60;
    const padTop = 10;
    const padBottom = 32;
    const chartW = w - padLeft - padRight;
    const chartH = h - padTop - padBottom;

    // Data range
    const rates = data.map(d => d.rate);
    const minRate = Math.floor(Math.min(...rates) * 10) / 10 - 0.1;
    const maxRate = Math.ceil(Math.max(...rates) * 10) / 10 + 0.1;
    const rateRange = maxRate - minRate;

    const xScale = (i) => padLeft + (i / (data.length - 1)) * chartW;
    const yScale = (rate) => padTop + (1 - (rate - minRate) / rateRange) * chartH;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Grid lines & Y labels
    ctx.strokeStyle = '#1F1A25';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#6B7280';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'right';

    const steps = 8;
    for (let i = 0; i <= steps; i++) {
      const rate = minRate + (rateRange / steps) * i;
      const y = yScale(rate);
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(w - padRight, y);
      ctx.stroke();
      ctx.fillText(rate.toFixed(1) + '%', padLeft - 8, y + 4);
    }

    // X labels
    ctx.textAlign = 'center';
    const labelInterval = Math.ceil(data.length / 6);
    for (let i = 0; i < data.length; i += labelInterval) {
      const x = xScale(i);
      ctx.fillText(data[i].dateLabel, x, h - 8);
    }

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
    const lastRate = data[data.length - 1].rate;
    const firstRate = data[0].rate;
    if (lastRate < firstRate) {
      gradient.addColorStop(0, 'rgba(239,68,68,0.12)');
      gradient.addColorStop(1, 'rgba(239,68,68,0)');
    } else {
      gradient.addColorStop(0, 'rgba(16,185,129,0.12)');
      gradient.addColorStop(1, 'rgba(16,185,129,0)');
    }

    // Fill area
    ctx.beginPath();
    ctx.moveTo(xScale(0), yScale(data[0].rate));
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(xScale(i), yScale(data[i].rate));
    }
    ctx.lineTo(xScale(data.length - 1), padTop + chartH);
    ctx.lineTo(xScale(0), padTop + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.moveTo(xScale(0), yScale(data[0].rate));
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(xScale(i), yScale(data[i].rate));
    }
    ctx.strokeStyle = lastRate < firstRate ? '#EF4444' : '#E61C80';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Current rate marker
    const lastX = xScale(data.length - 1);
    const lastY = yScale(lastRate);

    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#E61C80';
    ctx.fill();
    ctx.strokeStyle = 'rgba(230,28,128,0.4)';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Current rate label (right side)
    const labelW = 52;
    const labelH = 20;
    ctx.fillStyle = '#E61C80';
    ctx.beginPath();
    ctx.roundRect(w - padRight + 6, lastY - labelH / 2, labelW, labelH, 3);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(lastRate.toFixed(1) + '%', w - padRight + 6 + labelW / 2, lastY + 4);

    // Dashed line from last point to label
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = 'rgba(230,28,128,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(w - padRight + 6, lastY);
    ctx.stroke();
    ctx.setLineDash([]);

  }, [data]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
