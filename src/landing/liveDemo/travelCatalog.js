import { HOTEL_IMAGES } from './hotelImages'

export const TRAVEL_CATALOG = {
  international: [
    {
      id: 'int-1',
      title: 'Coastal city break',
      place: 'Dubai, UAE',
      duration: '5 days / 4 nights',
      price: '₹89,499',
      coverSrc: HOTEL_IMAGES[0],
    },
    {
      id: 'int-2',
      title: 'Island retreat',
      place: 'Bali, Indonesia',
      duration: '7 days / 6 nights',
      price: '₹69,999',
      coverSrc: HOTEL_IMAGES[1],
    },
    {
      id: 'int-3',
      title: 'Alpine escape',
      place: 'Zermatt, Switzerland',
      duration: '6 days / 5 nights',
      price: '₹1,24,900',
      coverSrc: HOTEL_IMAGES[2],
    },
  ],
  domestic: [
    {
      id: 'dom-1',
      title: 'Heritage circuit',
      place: 'Rajasthan, India',
      duration: '6 days / 5 nights',
      price: '₹42,900',
      coverSrc: HOTEL_IMAGES[3],
    },
    {
      id: 'dom-2',
      title: 'Hill station long weekend',
      place: 'Kodaikanal, India',
      duration: '3 days / 2 nights',
      price: '₹18,400',
      coverSrc: HOTEL_IMAGES[2],
    },
    {
      id: 'dom-3',
      title: 'Coastal slow travel',
      place: 'Goa, India',
      duration: '4 days / 3 nights',
      price: '₹24,750',
      coverSrc: HOTEL_IMAGES[3],
    },
  ],
}
