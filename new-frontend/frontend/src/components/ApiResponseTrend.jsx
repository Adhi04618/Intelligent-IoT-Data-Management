import React from 'react';

const ApiResponseTrend = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No API response-time data available yet.</p>;
  }

  const width = 700;
  const height = 280;
  const padding = 50;

  const values = data.map(item => item.responseTime);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const averageValue =
  values.reduce((sum, value) => sum + value, 0) / values.length;

const variation = maxValue - minValue;

  const range = maxValue - minValue || 1;

  const points = data.map((item, index) => {
    const x =
      padding +
      (index * (width - padding * 2)) /
        Math.max(data.length - 1, 1);

    const y =
      height -
      padding -
      ((item.responseTime - minValue) / range) *
        (height - padding * 2);

    return { x, y, ...item };
  });

  return (
    <div>
      <h3>API Response Time Trend</h3>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', maxWidth: '700px' }}
      >
        {/* Y axis */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="currentColor"
        />

        {/* X axis */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="currentColor"
        />

        {/* Trend line */}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
        />

        {/* Data points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="currentColor"
            />

            <text
              x={point.x}
              y={point.y - 12}
              textAnchor="middle"
              fontSize="12"
              fill="currentColor"
            >
              {point.responseTime} ms
            </text>

            <text
              x={point.x}
              y={height - padding + 22}
              textAnchor="middle"
              fontSize="12"
              fill="currentColor"
            >
              {point.test}
            </text>
          </g>
        ))}
      </svg>
      <div>
  <h4>API Performance Insights</h4>

  <p>Average Response Time: {averageValue.toFixed(2)} ms</p>
  <p>Minimum Response Time: {minValue.toFixed(2)} ms</p>
  <p>Maximum Response Time: {maxValue.toFixed(2)} ms</p>
  <p>Response Time Variation: {variation.toFixed(2)} ms</p>
  <p>
  <strong>Engineering Insight:</strong>{' '}
  The API response time is currently averaging {averageValue.toFixed(2)} ms,
  with a variation of {variation.toFixed(2)} ms across recent requests.
  Continued monitoring can help identify changes in backend API performance.
</p>
</div>
    </div>
  );
};

export default ApiResponseTrend;