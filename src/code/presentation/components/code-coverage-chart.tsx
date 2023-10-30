import React, { useEffect, useRef } from 'react'
import { CodeCoverage } from '@/code/domain'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
Chart.register(CategoryScale)

export const CodeCoverageChart = ({
  codeCoverage,
}: {
  codeCoverage: CodeCoverage
}) => {
  const chartData = {
    labels: Object.keys(codeCoverage),
    datasets: [
      {
        label: 'Coverage Percentage',
        data: Object.values(codeCoverage).map((metric) => metric.pct),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Users Gained between 2016-2020',
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  )
}
