import BarGraph from '@/components/Bar'
import LineGraph from '@/components/Line'
import Navbar from '@/components/Navbar'
import PieGraph from '@/components/Pie'
import React from 'react'

function Dashboard() {
  return (
    <div className="bg-[#14162e] text-white font-gilroy ">
            <Navbar />
      <LineGraph />
      <BarGraph />
    </div>
  )
}

export default Dashboard