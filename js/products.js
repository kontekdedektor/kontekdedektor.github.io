// Bu dosya, sitedeki tüm ürünlerin verilerini içerir.
// Yeni bir ürün eklendiğinde veya mevcut bir ürün güncellendiğinde
// sadece bu dosyanın değiştirilmesi yeterlidir.

export const products = {
  'ktd-100': {
    title: 'KTD-100 Gradiyometre',
    badge: 'Temel Model',
    badgeEn: 'Basic Model',
    badgeColor: 'bg-primary text-white',
    description: 'Profesyonel kullanıcılar için tasarlanmış temel model gradiyometremiz. 5 metre derinliğe kadar hassas algılama.',
    descriptionEn: 'Our basic model gradiometer designed for professional users. Precise detection up to 5 meters depth.',
    features: [
      '5 metre algılama derinliği',
      'LCD ekran',
      '8 saat pil ömrü',
      'Temel metal ayırt etme',
      'Hafif ve ergonomik tasarım',
      'Su geçirmez gövde'
    ],
    featuresEn: [
      '5 meter detection depth',
      'LCD display',
      '8 hour battery life',
      'Basic metal discrimination',
      'Lightweight and ergonomic design',
      'Waterproof body'
    ],
    techSpecs: [
      { name: 'Ağırlık', nameEn: 'Weight', value: '1.2 kg' },
      { name: 'Boyutlar', nameEn: 'Dimensions', value: '45x25x15 cm' },
      { name: 'Çalışma Sıcaklığı', nameEn: 'Operating Temperature', value: '-10°C ile 50°C' },
      { name: 'Garanti', nameEn: 'Warranty', value: '2 Yıl' },
      { name: 'Sensör Tipi', nameEn: 'Sensor Type', value: 'Çift Sensör' },
      { name: 'Kablosuz Bağlantı', nameEn: 'Wireless Connection', value: 'Yok' }
    ],
    price: '₺7,999',
    oldPrice: '₺9,999',
    discount: '%20 İndirim',
    discountEn: '%20 Discount'
  },
  'ktd-200': {
    title: 'KTD-200 Pro Gradiyometre',
    badge: 'En Çok Satan',
    badgeEn: 'Best Seller',
    badgeColor: 'bg-secondary text-[#0A0F2D]',
    description: 'Orta ve ileri seviye kullanıcılar için kablosuz bağlantı özellikli profesyonel gradiyometre.',
    descriptionEn: 'Professional gradiometer with wireless connectivity for intermediate and advanced users.',
    features: [
      '8 metre algılama derinliği',
      'Renkli dokunmatik ekran',
      'Kablosuz bağlantı',
      '10 saat pil ömrü',
      'Gelişmiş metal ayırt etme',
      '3D tarama özelliği'
    ],
    featuresEn: [
      '8 meter detection depth',
      'Color touch screen',
      'Wireless connection',
      '10 hour battery life',
      'Advanced metal discrimination',
      '3D scanning feature'
    ],
    techSpecs: [
      { name: 'Ağırlık', nameEn: 'Weight', value: '1.5 kg' },
      { name: 'Boyutlar', nameEn: 'Dimensions', value: '50x30x20 cm' },
      { name: 'Çalışma Sıcaklığı', nameEn: 'Operating Temperature', value: '-15°C ile 55°C' },
      { name: 'Garanti', nameEn: 'Warranty', value: '3 Yıl' },
      { name: 'Sensör Tipi', nameEn: 'Sensor Type', value: 'Dörtlü Sensör' },
      { name: 'Kablosuz Bağlantı', nameEn: 'Wireless Connection', value: 'Wi-Fi ve Bluetooth' }
    ],
    price: '₺12,499',
    oldPrice: '₺15,999',
    discount: '%22 İndirim',
    discountEn: '%22 Discount'
  },
  'ktd-300': {
    title: 'KTD-300 Ultra Gradiyometre',
    badge: 'Premium Model',
    badgeEn: 'Premium Model',
    badgeColor: 'bg-primary text-white',
    description: 'Profesyonel arama ekipleri için yapay zeka destekli, en yüksek hassasiyete sahip premium gradiyometre.',
    descriptionEn: 'AI-supported premium gradiometer with the highest precision for professional search teams.',
    features: [
      '10+ metre algılama derinliği',
      'Yüksek çözünürlüklü dokunmatik ekran',
      'Yapay zeka destekli analiz',
      '3D görüntüleme teknolojisi',
      '12 saat pil ömrü',
      'GPS entegrasyonu'
    ],
    featuresEn: [
      '10+ meter detection depth',
      'High resolution touch screen',
      'AI-supported analysis',
      '3D imaging technology',
      '12 hour battery life',
      'GPS integration'
    ],
    techSpecs: [
      { name: 'Ağırlık', nameEn: 'Weight', value: '1.8 kg' },
      { name: 'Boyutlar', nameEn: 'Dimensions', value: '55x35x25 cm' },
      { name: 'Çalışma Sıcaklığı', nameEn: 'Operating Temperature', value: '-20°C ile 60°C' },
      { name: 'Garanti', nameEn: 'Warranty', value: '5 Yıl' },
      { name: 'Sensör Tipi', nameEn: 'Sensor Type', value: 'Altılı Sensör Dizisi' },
      { name: 'Kablosuz Bağlantı', nameEn: 'Wireless Connection', value: 'Wi-Fi, Bluetooth ve 4G' }
    ],
    price: '₺19,999',
    oldPrice: '₺24,999',
    discount: '%20 İndirim',
    discountEn: '%20 Discount'
  }
};
