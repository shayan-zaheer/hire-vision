import BarGraph from '@/components/Bar'
import LineGraph from '@/components/Line'
import PieGraph from '@/components/Pie'
import React from 'react'

function Dashboard() {
  return (
    <div>
      <LineGraph />
      <BarGraph />
      <PieGraph />
    </div>
  )
}

export default Dashboard