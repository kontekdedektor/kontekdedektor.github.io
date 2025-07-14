// products.js dosyasından ürün verilerini içe aktar
import { products } from './products.js';

document.addEventListener('DOMContentLoaded', function() {

    //=================================================
    // Dil Değiştirme Fonksiyonları
    //=================================================
    const savedLang = localStorage.getItem('language') || 'tr';
    setLanguage(savedLang);
    highlightActiveLanguage(savedLang);

    document.querySelectorAll('.language-selector').forEach(selector => {
      selector.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        setLanguage(lang);
        localStorage.setItem('language', lang);
        highlightActiveLanguage(lang);
      });
    });
    
    function setLanguage(lang) {
      document.querySelectorAll('[data-tr], [data-en]').forEach(element => {
        const attr = `data-${lang}`;
        const placeholderAttr = `data-${lang}-placeholder`;

        if (element.hasAttribute(attr)) {
          element.textContent = element.getAttribute(attr);
        } 
        
        if (element.hasAttribute(placeholderAttr)) {
          element.setAttribute('placeholder', element.getAttribute(placeholderAttr));
        }

        if (element.tagName === 'SELECT') {
            element.querySelectorAll('option').forEach(option => {
                if(option.hasAttribute(attr)) {
                    option.textContent = option.getAttribute(attr);
                }
            });
        }
      });
      document.documentElement.lang = lang;
    }
    
    function highlightActiveLanguage(lang) {
      document.querySelectorAll('.language-selector').forEach(selector => {
        if (selector.getAttribute('data-lang') === lang) {
          selector.classList.remove('text-gray-400');
          selector.classList.add('text-white');
        } else {
          selector.classList.remove('text-white');
          selector.classList.add('text-gray-400');
        }
      });
    }

    //=================================================
    // Navigasyon Fonksiyonları
    //=================================================
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('bg-[#0A0F2D]');
        header.classList.remove('bg-opacity-20');
      } else {
        header.classList.remove('bg-[#0A0F2D]');
        header.classList.add('bg-opacity-20');
      }
    });
    
    const menuButton = document.querySelector('button[aria-label="Menüyü Aç"]');
    const closeButton = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if(menuButton) {
        menuButton.addEventListener('click', () => mobileMenu.classList.remove('translate-x-full'));
    }
    if(closeButton) {
        closeButton.addEventListener('click', () => mobileMenu.classList.add('translate-x-full'));
    }
    
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('translate-x-full'));
    });

    //=================================================
    // Smooth Scroll Fonksiyonları
    //=================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Navbar yüksekliği kadar boşluk
            behavior: 'smooth'
          });
        }
      });
    });

    //=================================================
    // Ürün Detay Modal Fonksiyonları
    //=================================================
    const productButtons = document.querySelectorAll('.product-detail-btn');
    const productModal = document.getElementById('product-modal');
    const closeModalButton = document.getElementById('close-product-modal');

    function openProductModal(productId) {
        const product = products[productId];
        if (!product) return;
        const currentLang = localStorage.getItem('language') || 'tr';

        document.getElementById('modal-product-title').textContent = product.title;
        document.getElementById('modal-product-description').textContent = currentLang === 'tr' ? product.description : product.descriptionEn;
        
        const badge = document.getElementById('modal-product-badge');
        badge.textContent = currentLang === 'tr' ? product.badge : product.badgeEn;
        badge.className = `inline-block text-xs font-bold py-1 px-3 rounded-full mb-4 ${product.badgeColor}`;
        
        const featuresContainer = document.getElementById('modal-product-features');
        featuresContainer.innerHTML = '';
        const features = currentLang === 'tr' ? product.features : product.featuresEn;
        features.forEach(feature => {
            const featureElement = document.createElement('div');
            featureElement.className = 'flex items-center text-gray-300';
            featureElement.innerHTML = `<i class="ri-check-line text-primary mr-2"></i><span>${feature}</span>`;
            featuresContainer.appendChild(featureElement);
        });
        
        document.getElementById('modal-product-price').textContent = product.price;
        document.getElementById('modal-product-oldprice').textContent = product.oldPrice;
        document.getElementById('modal-product-discount').textContent = currentLang === 'tr' ? product.discount : product.discountEn;
        
        const techSpecsContainer = document.getElementById('modal-tech-specs');
        techSpecsContainer.innerHTML = '';
        product.techSpecs.forEach(spec => {
            const specElement = document.createElement('div');
            specElement.className = 'flex justify-between py-2 border-b border-gray-800';
            specElement.innerHTML = `<span class="text-gray-400">${currentLang === 'tr' ? spec.name : spec.nameEn}</span><span class="text-white">${spec.value}</span>`;
            techSpecsContainer.appendChild(specElement);
        });
        
        document.querySelectorAll('#product-modal [data-tr]').forEach(el => {
            el.textContent = el.getAttribute(currentLang === 'tr' ? 'data-tr' : 'data-en');
        });
        
        productModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeProductModal() {
        productModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            openProductModal(this.getAttribute('data-product'));
        });
    });

    if(closeModalButton) closeModalButton.addEventListener('click', closeProductModal);
    if(productModal) productModal.addEventListener('click', e => e.target === productModal && closeProductModal());
    document.addEventListener('keydown', e => e.key === 'Escape' && !productModal.classList.contains('hidden') && closeProductModal());

    document.querySelectorAll('.product-footer-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product');
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => openProductModal(productId), 700);
        });
    });

    //=================================================
    // Diğer Modal Pencereler (Gizlilik, Kullanım vb.)
    //=================================================
    const modalTriggers = {
        'privacy-policy-link': 'privacy-policy-modal',
        'terms-of-use-link': 'terms-of-use-modal',
        'cookies-policy-link': 'cookies-policy-modal'
    };

    for (const triggerId in modalTriggers) {
        const trigger = document.getElementById(triggerId);
        const modalId = modalTriggers[triggerId];
        const modal = document.getElementById(modalId);
        if (trigger && modal) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.remove('hidden');
            });
            const closeBtn = document.getElementById(`close-${modalId.replace('-modal', '')}`);
            if(closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
        }
    }
    
    //=================================================
    // İletişim Formu Doğrulama
    //=================================================
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // ... (form doğrulama kodunuz burada) ...
        console.log("İletişim formu gönderildi (simülasyon).");
      });
    }
});
