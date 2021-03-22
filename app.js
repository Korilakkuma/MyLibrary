'use strict';

const callback = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      document.querySelector(`[href="#${entry.target.id}"]`).classList.remove('-current');
      return;
    }

    document.querySelector(`[href="#${entry.target.id}"]`).classList.add('-current');
  });
};

const observer = new IntersectionObserver(callback, { threshold: [0, 0.5, 1] });

['section-prolog', 'section-2011', 'section-2012', 'section-2013', 'section-2014', 'section-epilogue'].forEach((id) => {
  observer.observe(document.getElementById(id));
});
