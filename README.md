# 🎓 Kırşehir Ahi Evran Üniversitesi — Anonim Hikaye Forumu

> Sessiz kalmak zorunda değilsin. Kimliğin gizli, sesin özgür.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Yayında-brightgreen?style=flat-square&logo=github)](https://github.com)
[![Lisans](https://img.shields.io/badge/Lisans-MIT-blue?style=flat-square)](LICENSE)
[![Yapımcı](https://img.shields.io/badge/Yapımcı-Hamza%20Kahveci-orange?style=flat-square)](mailto:kahveci.hamza@ogr.ahievran.edu.tr)

---

## 📖 Proje Hakkında

Bu platform, Kırşehir Ahi Evran Üniversitesi öğrencilerinin ve 18–30 yaş arası gençlerin **psikolojik zorluk, akademik baskı, yalnızlık ve sosyal sorunlarla** ilgili deneyimlerini **tamamen anonim** biçimde paylaşabilmeleri için geliştirilmiş bir forum sitesidir.

### 🎯 Temel Hedefler
- Gençlerdeki ruh sağlığı damgasını (stigma) kırmak
- "Yalnız değilim" hissini yaygınlaştırmak
- Psikolojik destek kaynaklarına yönlendirme sağlamak
- Akademik araştırma için anket verisi toplamak

---

## ✨ Özellikler

| Özellik | Açıklama |
|--------|----------|
| 📝 Anonim Hikaye Paylaşımı | İsim, e-posta veya kimlik bilgisi gerektirmez |
| 🗂️ Kategori Sistemi | Ruh Sağlığı, Akademik Baskı, Yalnızlık, Aile, vb. |
| 🔍 Gelişmiş Arama & Filtreleme | Metin arama, kategori ve sıralama filtresi |
| 💙 Tepki Sistemi | Hikayelere destek emojisi verme |
| 📊 Canlı İstatistikler | Toplam hikaye ve tepki sayısı |
| 📱 Tam Responsive | Masaüstü ve mobil uyumlu |
| 🔐 Gizlilik Önce | Tüm veriler yalnızca tarayıcıda (localStorage) saklanır |
| 🎨 AEÜ Renk Teması | Mavi, yeşil ve altın — Ahi Evran logo renkleri |

---

## 🗂️ Dosya Yapısı

```
📁 proje/
│
├── 📄 index.html                  # Ana forum sayfası
├── 🎨 style.css                   # Stil dosyası (AEÜ teması)
├── ⚙️  app.js                     # Uygulama mantığı (JS)
├── 📋 google-form-sorulari.html   # 10 anket sorusu + cevap anahtarı
└── 📖 README.md                   # Bu dosya
```

---

## 🚀 Kurulum ve Kullanım

### Yerel Çalıştırma
```bash
# Repoyu klonla
git clone https://github.com/KULLANICI_ADIN/ahievran-anonim-forum.git

# Klasöre gir
cd ahievran-anonim-forum

# Herhangi bir tarayıcıda aç
open index.html
# veya
start index.html   # Windows için
```

### GitHub Pages ile Yayınlama
1. GitHub'da yeni bir repo oluştur
2. Dosyaları yükle
3. **Settings → Pages → Source: main branch** seç
4. Birkaç dakika içinde `https://KULLANICI_ADIN.github.io/repo-adi` adresinde yayında olur

---

## 📋 Google Form Entegrasyonu

`google-form-sorulari.html` dosyası, araştırma anketini oluşturmak için **10 hazır soru** ve her sorunun **araştırma amacı ile beklenen bulgularını** içerir.

### Anketi Oluşturma Adımları
1. [Google Forms](https://forms.google.com) adresine git
2. Yeni form oluştur: **"Kırşehir Ahi Evran - Ruh Sağlığı Araştırması"**
3. `google-form-sorulari.html` dosyasındaki 10 soruyu forma aktar
4. Form linkini `index.html` içindeki şu alana yapıştır:
   ```html
   <a href="https://forms.gle/FORM_LINKINIZ" ...>
   ```
   ve
   ```html
   <a href="https://forms.gle/FORM_LINKINIZ" ...>
   ```

### Soru Özeti

| # | Soru | Tür |
|---|------|-----|
| 1 | Yaş aralığı | Çoktan seçmeli |
| 2 | Son 6 ayda psikolojik zorluk yaşadı mı? | Çoktan seçmeli |
| 3 | En çok hangi konularda stres yaşıyor? | Çoklu seçim |
| 4 | Psikolojik destek aldı mı? | Çoktan seçmeli |
| 5 | Destek almamışsa engel neydi? | Çoktan seçmeli |
| 6 | Duygularını çevreyle ne kadar paylaşıyor? | 1–5 Ölçek |
| 7 | Zor dönemde hangi desteğe ihtiyaç duyuyor? | Çoktan seçmeli |
| 8 | Anonim platform olsaydı kullanır mıydı? | Çoktan seçmeli |
| 9 | Platformda hangi özellikler önemli? | Çoklu seçim |
| 10 | Açık görüş / mesaj | Açık uçlu |

---

## 🎨 Renk Paleti

Kırşehir Ahi Evran Üniversitesi kurumsal kimliği baz alınmıştır:

| Renk | Hex | Anlam |
|------|-----|-------|
| 🔵 Koyu Mavi | `#1a4a7a` | Gökyüzü (Logo ana rengi) |
| 🟢 Koyu Yeşil | `#2e7d32` | Yeryüzü (Logo ikinci rengi) |
| 🟡 Altın Sarısı | `#f9a825` | Ahilik Kuşağı (Logo vurgu rengi) |

---

## 🔐 Gizlilik Politikası

- ❌ Sunucuya **hiçbir veri gönderilmez**
- ❌ Kullanıcı **takip edilmez**
- ✅ Hikayeler yalnızca **kullanıcının kendi tarayıcısında** (localStorage) saklanır
- ✅ Sayfayı kapattığınızda veriler temizlenmez ancak **yalnızca o cihazda görünür**

> ⚠️ **Not:** Gerçek bir çok-kullanıcılı forum için bir backend (Node.js, Firebase vb.) eklenmesi önerilir.

---

## 🆘 Kriz Kaynakları

Platform içinde aşağıdaki acil yardım hatlarına yönlendirme bulunmaktadır:

- **ALO 182** — Psikolojik Destek Hattı (7/24 ücretsiz)
- **ALO 156** — Acil Sosyal Destek Hattı

---

## 🛠️ Teknolojiler

- **HTML5** — Yapısal iskelet
- **CSS3** — Animasyon ve responsive tasarım
- **Vanilla JavaScript** — Uygulama mantığı (framework kullanılmadı)
- **Google Fonts** — Merriweather + Source Sans 3
- **localStorage API** — İstemci tarafı veri saklama

---

## 📄 Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır. Serbestçe kullanabilir, değiştirebilir ve dağıtabilirsiniz.

---

## 👤 İletişim

**Hamza Kahveci**  
Kırşehir Ahi Evran Üniversitesi  
📧 [kahveci.hamza@ogr.ahievran.edu.tr](mailto:kahveci.hamza@ogr.ahievran.edu.tr)

---

<div align="center">
  <sub>© 2026 Hamza Kahveci — Kırşehir Ahi Evran Üniversitesi</sub><br/>
  <sub>💙 Sessiz kalmak zorunda değilsin.</sub>
</div>
