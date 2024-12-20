import React from 'react'

const dataofTotalOrganization = [
        {amount: 270,desc:'ចំនួនសរុប', title: 'អង្គការភាព'},
        {amount: 180,desc:'ចំនួនសរុប', title: 'កម្មវិធីបរិច្ចាគ'},
        {amount: 999,desc:'ចំនួនសរុប', title: 'អ្នកស្ម័គ្រចិត្ត'},
        {amount: 12,desc:'ឆ្នាំ', title: 'នៃការបង្កើត'},
]

export default function TotalOrganizationComponent() {
  return (
        <section className='grid grid-cols-2 md:grid-cols-4 h-[200px] gap-10 item-center  bg-iDonate-navy-accent rounded-xl w-[86%] mx-auto'>
            {
                dataofTotalOrganization.map((item, index) => (
                    <div key={index} className='w-full'>
                        <div className=' h-full justify-center items-center flex gap-4 text-iDonate-navy-primary'>
                        <div className='items-center '>
                            <span className='text-6xl font-bold text-iDonate-green-primary'>{item.amount}</span>
                        </div>
                        <div className='items-center' lang='km'>
                                <span>{item.desc}</span>
                                <div>
                                   <span>{item.title}</span>     
                                </div>
                        </div>

                        </div>
                       
                    </div>
                ))
            }
        </section>
  )
}
