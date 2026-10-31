/**
 * =================================================================
 * الملف البرمجي الرئيسي | Main JavaScript Logic
 * =================================================================
 * الأستاذ محمد بلقاضي - الأستاذ في الهندسة الكهربائية
 * إدارة اللغات، البيانات المركزية، والتفاعلات
 * =================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. تحديد اللغة الافتراضية (عربي افتراضياً، أو المحفوظة في localStorage)
  let currentLang = localStorage.getItem('belkadi_lang') || 'ar';

  // 2. القواميس الثنائية اللغة | Bilingual Dictionaries
  const translations = {
    ar: {
      dir: 'rtl',
      langCode: 'ar',
      switchLangText: 'English 🇺🇸',
      socialTitle: 'تابعني على منصات التواصل الاجتماعي',
      contactTitle: 'تواصل معي',
      saveContactBtn: 'حفظ بطاقة الاتصال (vCard)',
      saveContactSub: 'أضف بياناتي مباشرة إلى جهات الاتصال في هاتفك',
      platforms: {
        instagram: 'إنستغرام',
        facebook: 'فيسبوك',
        telegram: 'تلغرام',
        youtube: 'يوتيوب'
      },
      contacts: {
        whatsapp: 'مراسلة عبر واتساب',
        phone: 'اتصال هاتفي مباشر',
        email: 'البريد الإلكتروني المهني'
      },
      footerTitle: 'أستاذ التعليم الثانوي في الهندسة الكهربائية',
      footerRights: '© 2026 الأستاذ محمد بلقاضي. جميع الحقوق محفوظة.'
    },
    en: {
      dir: 'ltr',
      langCode: 'en',
      switchLangText: 'العربية 🇩🇿',
      socialTitle: 'Follow Me on Social Media',
      contactTitle: 'Contact Me',
      saveContactBtn: 'Save Contact Card (vCard)',
      saveContactSub: 'Add my details directly to your phone contacts',
      platforms: {
        instagram: 'Instagram',
        facebook: 'Facebook',
        telegram: 'Telegram',
        youtube: 'YouTube'
      },
      contacts: {
        whatsapp: 'Chat via WhatsApp',
        phone: 'Direct Phone Call',
        email: 'Professional Email'
      },
      footerTitle: 'Electrical Engineering Teacher',
      footerRights: '© 2026 Mohammed Belkadi. All Rights Reserved.'
    }
  };

  // 3. دالة تطبيق البيانات والتحديث | Render Content Function
  function renderPage(lang) {
    const t = translations[lang];

    // تحديث اتجاه الصفحة واللغة
    document.documentElement.setAttribute('dir', t.dir);
    document.documentElement.setAttribute('lang', t.langCode);
    document.body.setAttribute('dir', t.dir);

    // تحديث النصوص الثابتة
    document.getElementById('langSwitchText').textContent = t.switchLangText;
    document.getElementById('socialTitleText').textContent = t.socialTitle;
    document.getElementById('contactTitleText').textContent = t.contactTitle;
    document.getElementById('saveContactText').textContent = t.saveContactBtn;
    document.getElementById('saveContactSubText').textContent = t.saveContactSub;

    // تحديث الملف الشخصي من config.js
    if (typeof SITE_CONFIG !== 'undefined') {
      const p = SITE_CONFIG.profile;
      document.getElementById('profileNameAr').textContent = p.nameAr;
      document.getElementById('profileNameEn').textContent = p.nameEn;

      const titleEl = document.getElementById('profileTitle');
      titleEl.textContent = lang === 'ar' ? p.titleAr : p.titleEn;

      const specialtyEl = document.getElementById('profileSpecialty');
      specialtyEl.textContent = lang === 'ar' ? p.specialtyAr : p.specialtyEn;

      const bioEl = document.getElementById('profileBio');
      bioEl.textContent = lang === 'ar' ? p.bioAr : p.bioEn;

      const avatarEl = document.getElementById('profileAvatar');
      if (p.avatar) {
        avatarEl.src = p.avatar;
      }

      // تحديث روابط التواصل الاجتماعي
      const s = SITE_CONFIG.social;
      setLink('igLink', s.instagram);
      setLink('fbLink', s.facebook);
      setLink('tgLink', s.telegram);
      setLink('ytLink', s.youtube);

      // تسميات منصات التواصل
      document.getElementById('igLabel').textContent = t.platforms.instagram;
      document.getElementById('fbLabel').textContent = t.platforms.facebook;
      document.getElementById('tgLabel').textContent = t.platforms.telegram;
      document.getElementById('ytLabel').textContent = t.platforms.youtube;

      // تحديث روابط الاتصال
      const c = SITE_CONFIG.contacts;
      setLink('waLink', `https://wa.me/${c.whatsapp}`);
      setLink('phoneLink', `tel:${c.phone}`);
      setLink('emailLink', `mailto:${c.email}`);

      // تسميات الاتصال
      document.getElementById('waLabel').textContent = t.contacts.whatsapp;
      document.getElementById('phoneLabel').textContent = t.contacts.phone;
      document.getElementById('emailLabel').textContent = t.contacts.email;

      // زر vCard
      const vCardBtn = document.getElementById('vcardBtn');
      vCardBtn.href = `files/${SITE_CONFIG.vcard.fileName}`;
      vCardBtn.setAttribute('download', SITE_CONFIG.vcard.fileName);

      // تذييل الصفحة
      document.getElementById('footerName').textContent = lang === 'ar' ? p.nameAr : p.nameEn;
      document.getElementById('footerTitle').textContent = t.footerTitle;
      document.getElementById('footerRights').textContent = t.footerRights;

      // تحديث عنوان المتصفح (Page Title)
      document.title = `${lang === 'ar' ? p.nameAr : p.nameEn} | ${lang === 'ar' ? p.titleAr : p.titleEn}`;
    }
  }

  // مساعدة لتعيين الروابط بأمان
  function setLink(elementId, url) {
    const el = document.getElementById(elementId);
    if (el && url) {
      el.href = url;
    }
  }

  // 4. تفعيل زر تبديل اللغة | Language Switcher Event
  const langSwitchBtn = document.getElementById('langSwitchBtn');
  if (langSwitchBtn) {
    langSwitchBtn.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('belkadi_lang', currentLang);
      renderPage(currentLang);
    });
  }

  // التشغيل الأولي
  renderPage(currentLang);
});
