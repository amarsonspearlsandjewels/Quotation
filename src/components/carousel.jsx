import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

export default function Carousel({ isLoading, setIsLoading }) {
  const [goldRates, setGoldRates] = useState({});

  useEffect(() => {
    const fetchGoldRates = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://apjapi.vercel.app/getGoldRates');
        const data = await res.json();
        setGoldRates(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch gold rates:', err);
      }
    };

    fetchGoldRates();
  }, []);

  return (
    <div className="carousel">
      <Marquee autoFill={true} speed={45} className="goldratemarquee">
        {Object.entries(goldRates).map(([purity, rate], index) => (
          <div key={purity} className="fincar">
            {' '}
            {purity} Gold - ₹{rate}/gm &nbsp;&nbsp;&nbsp;
            <div className="carouselcircle"></div>
            &nbsp;&nbsp;&nbsp;
          </div>
        ))}
      </Marquee>
    </div>
  );
}
