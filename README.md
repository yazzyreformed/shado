# ShadoWEB: AWS Tabanlı Akıllı Dil Çalışma Laboratuvarı 🚀☁️

> **Ders Adı:** Bulut Bilişim (CENG 3522) - Proje 1 Teslim Dokümantasyonu

ShadoWEB, kullanıcıların seçtikleri yabancı dildeki gerçek dünya kısa videoları (klipler, haber kesitleri) ile **Shadowing (Gölgeleme) tekniği** kullanarak telaffuz ve akıcılık (prosodi) becerilerini geliştirmelerini sağlayan SaaS tabanlı, bulut yerel bir web uygulamasıdır.

Uygulama baştan aşağı **Amazon Web Services (AWS)** üzerinde asenkron ve dağıtık bir mimaride barındırılarak bulut teknolojilerinin (Elastic Compute, Object Storage, Sürekli Entegrasyon) gücünü kullanacak şekilde optimize edilmiştir.

---

## 🏗️ Sistem ve AWS Bulut Mimarisi

Uygulamamız üç temel katmana dayanan bir AWS / Cloud mimarisi kullanmaktadır:

### 1. Compute & Hosting: AWS EC2 (Ubuntu)
- Tüm Backend (Node.js/Express) sunucumuz ve Frontend (React/Vite) statik derleme dosyalarımız, **AWS London Bölgesinde (eu-west-2) çalışan tek bir yüksek erişimli EC2** makinesi (`13.60.11.41`) üzerinde barındırılmaktadır. 
- Sunucu güvenliği için kurulan **Security Groups**, sadece gerekli HTTP(80), HTTPS(443) ve SSH(22) trafiklerine izin vermektedir. 
- Uygulama, sunucu kapansa/yeniden başlasa dahi **PM2** süreç yöneticisi tarafından anında, kesintisiz bir şekilde ayağa kaldırılır.  

### 2. Medya & Object Storage: AWS S3 
- Geleneksel sunucu maliyetlerinden ve bant genişliği sınırlarından kaçınmak için uygulamanın belkemiğini oluşturan ağır `.mp4` video dosyaları ve OpenAI Whisper tarafından çıkarılan `.vtt` transkript formatları **Amazon S3 (Simple Storage Service) `shadoweb-videolar` Bucket'ında** depolanmaktadır.

### 3. Veritabanı (DBaaS): MongoDB Atlas
- EC2 üzerinde yük oluşturmamak ve yüksek kullanılabilirlik sağlamak için, ilişkisel olmayan veri modeli (NoSQL) olan MongoDB, bulut yönetimli hizmet çözümü olan **MongoDB Atlas** üzerinde barındırılmaktadır. 

---

## 💻 Uygulama Özellikleri & Arayüz Mimarisi

ShadoWEB kullanıcılarına modern ve kesintisiz (SPA) bir deneyim sunar:

### 1. The Shadow Collection (Ana Menü) 
Kullanıcı giriş yaptığında (veya statik ID ile tanındığında), daha önceden çalıştığı videolar "Başarı Müzesi" şeklinde listelenir:
- Videoların zorluk dereceleri **Mavi (Kolay), Sarı (Orta) ve Kırmızı (Zor)** şeklinde dairesel neon çerçevelerle belirtilir.
- Dairenin sağ üstünde o videoyu kaç defa başarıyla çalıştığını gösteren bir sayaç rozeti (Badge) mevcuttur.
- Daereye tıklandığı an, klasik Github etkinlik takvimi benzeri döküm açılarak; kullanıcının o videoda aktif olduğu ve shadowing yaptığı günler 30 günlük bir "Activity Grid" formatında (ilgili zorluk renginde parlak) olarak listelenir.
- **Kısıtlama Kuralı:** Kullanıcı aynı videoyu "Günde sadece 1 kez" takvimine ve başarı hanesine ekletebilir.

### 2. Video Player & Transcript Laboratory
- Videoya basıldığı anda sinematik 16:9 bir `<video>` oynatıcısına yönlendiriliriz. 
- Sağ tarafta 4 adımlık statik ve yönlendirici "Shadowing Protocol" sekmesi bulunur.
- En alttaki sihirli `View Transcript Text` butonuna tıklandığında; Amazon S3'te barındırılan `.vtt` dosyası anında çekilir, Javascript ile arkaplandaki kod/timeline formatından temizlenir ve modal formunda okunaklı bir makale halinde sunulur. 
- Hedefe ulaşıldığında `(+) Add to Shadowlist` tıklanarak "Activity Log" işlenir ve bu işlem başarılıysa otomatik Collection listesine yansır.

### 3. Random Discover (Keşfet) Modülü 
- Sayfanın neresinde olursanız olun, sağ alt köşede yer alan ve havada asılı duran **(New Shado / Plus)** butonuna tıklanarak keşfet rotasına girilir.
- Bu algoritma; sistemdeki tüm S3 videolarını MongoDB Activity modeli ile kıyaslayarak **"Kullanıcının daha önce hiç çalışma yapmadığı"** bir listeden rulet gibi seçim yapar ve kullanıcıyı o videonun direk içine atar.

---

## 🚀 Teknik Kurulum ve Dağıtım Adımları

Projeyi kendi bilgisayarınızda (Lokalde) çalıştırmak isterseniz:

### 1. Backend Kurulumu
1. `cd backend`
2. `npm install`
3. Backend dizininde bir `.env` dosyası açıp `MONGO_URI` değerini ekleyin.
4. Sisteme ilk videoları S3 linkleriyle birlikte aktarmak için (veritabanını temizleyip sıfırdan kurar): `npm run seed`
5. Kurulum bittikten sonra `node server.js` komutu ile backend'i ayağa kaldırın. 

### 2. Frontend Kurulumu
1. `cd frontend`
2. `npm install`
3. `npm run dev` ile canlı geliştirici sunucusunu başlatın veya `npm run build` ile prodüksiyon için derleyin.

### AWS PM2 Otomasyonu (Bulut Ortamında Yayına Alma)
Tüm frontend dosyalarının derlenip AWS üzerinde PM2 süreci içine dahil edilmesi otomatize edilmiştir. Buluttaki kodları güncelleyip yayına almak için kullandığımız temel betik:

```bash
cd frontend 
npm run build 
rm -rf ../backend/public/*
mv dist/* ../backend/public/ 
cd ../backend
pm2 restart all
```

---

> Projenin kullanımını, detaylarını ve kod mimarisini anlatan detaylı YouTube veya Loom proje videosu sisteme/ilgili LMS panellerine ayrıca yüklenecektir. Başarılar dileriz! 🎓
