import WOW from 'wowjs';
export default function() {
  let wow = new WOW.WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true
  });
  wow.init();
  console.log('sss')
}