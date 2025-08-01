import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function GoogleAd({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  className = '',
  style = {}
}: GoogleAdProps) {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`google-ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          textAlign: 'center',
          ...style
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with your AdSense client ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}

// Sidebar ad component
export function SidebarAd() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
      <p className="text-xs text-slate-500 mb-2 text-center">Advertisement</p>
      <GoogleAd
        slot="XXXXXXXXXX" // Replace with your ad slot
        format="rectangle"
        style={{ minHeight: '250px', width: '300px' }}
        className="mx-auto"
      />
    </div>
  );
}

// In-content ad component (between job listings)
export function InContentAd() {
  return (
    <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 my-6">
      <p className="text-xs text-slate-500 mb-2 text-center">Sponsored</p>
      <GoogleAd
        slot="YYYYYYYYYY" // Replace with your ad slot
        format="horizontal"
        style={{ minHeight: '90px' }}
      />
    </div>
  );
}

// Footer ad component
export function FooterAd() {
  return (
    <div className="bg-white border-t border-slate-200 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs text-slate-500 mb-2 text-center">Advertisement</p>
        <GoogleAd
          slot="ZZZZZZZZZZ" // Replace with your ad slot
          format="horizontal"
          style={{ minHeight: '90px' }}
        />
      </div>
    </div>
  );
}

// Mobile banner ad
export function MobileBannerAd() {
  return (
    <div className="md:hidden bg-white border-b border-slate-200 p-2">
      <p className="text-xs text-slate-500 mb-1 text-center">Ad</p>
      <GoogleAd
        slot="WWWWWWWWWW" // Replace with your ad slot
        format="horizontal"
        style={{ minHeight: '50px' }}
      />
    </div>
  );
}

// Job detail ad component (in job details panel)
export function JobDetailAd() {
  return (
    <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 my-6">
      <p className="text-xs text-slate-500 mb-2 text-center">Sponsored</p>
      <GoogleAd
        slot="VVVVVVVVVV" // Replace with your ad slot
        format="rectangle"
        style={{ minHeight: '250px', maxWidth: '300px', margin: '0 auto' }}
        className="mx-auto"
      />
    </div>
  );
}