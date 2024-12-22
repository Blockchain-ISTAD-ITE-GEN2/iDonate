'use client'

import { Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Group from '@/public/images/group.png'

export default function BannerLandingCard() {
  return (
    <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${Group.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Green Overlay */}
        <div className="absolute inset-0 w-[80%] m-auto bg-iDonate-green-secondary/80 h-[80%] rounded-2xl">
        </div>
      </div>

      {/* Decorative Hearts */}
      <div className="absolute inset-0 z-10">
        <Heart className="absolute top-10 right-10 w-16 h-16 text-orange-400/50" />
        <Heart className="absolute bottom-10 left-10 w-20 h-20 text-green-200/50" />
        <Heart className="absolute top-1/2 left-1/4 w-12 h-12 text-orange-400/50" />
        <Heart className="absolute bottom-1/3 right-1/4 w-14 h-14 text-green-200/50" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto text-white">
        <p className="text-2xl mb-4 khmer-font" lang='km'>
        រួមចំណែកជាមួយដើម្បី សង្គមយើងប្រសើរឡើង
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 khmer-font leading-relaxed" lang='km'>
        ការបរិច្ចាគរបស់គឺន័យខ្លាំងណាស់សម្រាប់ពួកគាត់ <br/>
        <span className='leading-loose'>ចែករំលែកអ្វីអ្នកអាចចែកបាន</span>
        </h1>
        <Button 
          size="lg"
          className="bg-iDonate-navy-primary hover:bg-iDonate-navy-secondary text-white px-8 py-6 text-lg font-inter font-medium rounded-md"
        >
          Start Donating Them
        </Button>
      </div>
    </div>
  )
}

