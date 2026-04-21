/* =========================================
   Kırşehir Ahi Evran Üniversitesi
   Anonim Hikaye Forumu — Uygulama Mantığı
   Yapımcı: Hamza Kahveci — 2026
   ========================================= */

// ---- ÖRNEK HİKAYELER (Başlangıç Verisi) ----
const defaultStories = [
  {
    id: 1,
    title: "Sınav döneminde kendimi kaybettim",
    text: "Final haftasında öyle bir noktaya geldim ki sabahları yataktan kalkmak bile zorlaştı. Kimseye söyleyemedim çünkü 'sen iyi öğrencisin, ne derdin olabilir ki' diyeceklerini biliyordum. Ama içimde her şey birikiyor, her geçen gün biraz daha ağırlaşıyordu. Bu hikayeyi paylaşmak bile içimi hafifletiyor biraz. Yalnız değilim sanırım.",
    category: "Akademik Baskı",
    nickname: "Kaygılı Yıldız",
    mood: "😰",
    date: "2026-03-15",
    reactions: { "💙": 24, "🤗": 18, "💪": 31 }
  },
  {
    id: 2,
    title: "Yurt odasında sabah 3'te ağladım",
    text: "Şehirden uzakta, tanımadığım insanlarla aynı odada uyumaya çalışıyorum. Ailem 'neden arayıp sormuyorsun' diyor ama ben iyiyim demekten başka ne söyleyebilirim? Sesimi bastırarak ağlamayı öğrendim. Kimse bilmesin diye. Bu şehir beni bir yabancı gibi karşıladı ama belki de zamanla ev olur.",
    category: "Yalnızlık",
    nickname: "Sessiz Gece",
    mood: "😔",
    date: "2026-03-22",
    reactions: { "💙": 42, "🤗": 35, "💪": 19 }
  },
  {
    id: 3,
    title: "Kariyer seçimimden pişman olup olmadığımı bilmiyorum",
    text: "4 yıldır okuduğum bölümü sevip sevmediğimden emin değilim. İş bulacak mıyım? Tutku mu para mı takip etmeliyim? Herkes sanki cevabı biliyor gibi konuşuyor ama ben hâlâ karanlıktayım. Belki bu kaygı normaldir, belki değildir. Bilmemek de bir his.",
    category: "Kariyer Kaygısı",
    nickname: "İkircikli Genç",
    mood: "😰",
    date: "2026-04-01",
    reactions: { "💙": 55, "🤗": 28, "💪": 40 }
  },
  {
    id: 4,
    title: "Ailemin beklentileri omuzlarımı eziyor",
    text: "Her arama 'notların nasıl, mezun olunca ne yapacaksın' diye başlıyor. Başarılı olmayı seviyorum ama baskı altında değil. Bazen telefonu açmak istemiyorum. Hayal kırıklığı yaratmaktan korkuyorum. Onları seviyorum ama onların beklediği kişi olmak beni yoruyor.",
    category: "Aile",
    nickname: "Anonim",
    mood: "😔",
    date: "2026-04-08",
    reactions: { "💙": 67, "🤗": 44, "💪": 22 }
  }
];

// ---- DURUM YÖNETİMİ ----
let stories = [];
let selectedMood = "";
let activeCategory = "";

function loadStories() {
  try {
    const saved = localStorage.getItem("kahiaf_stories");
    if (saved) {
      stories = JSON.parse(saved);
    } else {
      stories = defaultStories;
      saveStories();
    }
  } catch {
    stories = defaultStories;
  }
}

function saveStories() {
  try {
    localStorage.setItem("kahiaf_stories", JSON.stringify(stories));
  } catch { /* sessiz hata */ }
}

// ---- NAVİGASYON ----
function showSection(name) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));

  const section = document.getElementById("section-" + name);
  if (section) section.classList.add("active");

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(l => {
    if (l.getAttribute("onclick") && l.getAttribute("onclick").includes(name)) {
      l.classList.add("active");
    }
  });

  if (name === "stories") renderStories();
  if (name === "home") renderHomeStories();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileMenu() {
  const nav = document.getElementById("mobileNav");
  nav.classList.toggle("open");
}

// ---- KATEGORİ FİLTRE ----
function filterCategory(cat) {
  activeCategory = cat;
  showSection("stories");
  const filterSelect = document.getElementById("categoryFilter");
  if (filterSelect) filterSelect.value = cat;
  renderStories();
}

// ---- HİKAYE RENDER ----
function getCategoryColor(cat) {
  const colors = {
    "Ruh Sağlığı":      "#1a4a7a",
    "Akademik Baskı":   "#2e7d32",
    "Yalnızlık":        "#4a148c",
    "Aile":             "#e65100",
    "Sevgi & İlişkiler":"#880e4f",
    "Kariyer Kaygısı":  "#1565c0",
    "Genel":            "#37474f"
  };
  return colors[cat] || "#1a4a7a";
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function renderStories() {
  const container = document.getElementById("stories-list");
  if (!container) return;

  const search = (document.getElementById("searchBox")?.value || "").toLowerCase();
  const catFilter = document.getElementById("categoryFilter")?.value || "";
  const sort = document.getElementById("sortFilter")?.value || "newest";

  let filtered = stories.filter(s => {
    const matchSearch = !search || s.title.toLowerCase().includes(search) || s.text.toLowerCase().includes(search);
    const matchCat = !catFilter || s.category === catFilter;
    return matchSearch && matchCat;
  });

  if (sort === "newest") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    filtered.sort((a, b) => {
      const totalA = Object.values(a.reactions).reduce((x, y) => x + y, 0);
      const totalB = Object.values(b.reactions).reduce((x, y) => x + y, 0);
      return totalB - totalA;
    });
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <p>Bu kriterlere uygun hikaye bulunamadı.</p>
      </div>`;
    return;
  }

  container.innerHTML = `<div class="stories-grid">${filtered.map(s => storyCard(s)).join("")}</div>`;
}

function renderHomeStories() {
  const container = document.getElementById("home-stories-list");
  if (!container) return;
  const recent = [...stories].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  container.innerHTML = `<div class="stories-grid">${recent.map(s => storyCard(s)).join("")}</div>`;
}

function storyCard(s) {
  const color = getCategoryColor(s.category);
  return `
    <div class="story-card" onclick="openStory(${s.id})" style="border-left-color: ${color}">
      <div class="story-card-header">
        <div class="story-card-header-left">
          ${s.mood ? `<span class="mood-badge">${s.mood}</span>` : ""}
          <span class="story-category-tag" style="background:${color}">${s.category}</span>
        </div>
        <span class="story-date">${formatDate(s.date)}</span>
      </div>
      <h3>${escapeHtml(s.title)}</h3>
      <p class="story-excerpt">${escapeHtml(s.text)}</p>
      <div class="story-card-footer">
        <span class="story-author">— ${escapeHtml(s.nickname || "Anonim")}</span>
        <div class="story-reactions">
          ${Object.entries(s.reactions).map(([emoji, count]) => `
            <button class="reaction-btn" onclick="react(event, ${s.id}, '${emoji}')">${emoji} ${count}</button>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// ---- MODAL ----
function openStory(id) {
  const s = stories.find(x => x.id === id);
  if (!s) return;
  const color = getCategoryColor(s.category);
  document.getElementById("modalBody").innerHTML = `
    <span class="modal-category" style="background:${color}">${s.category}</span>
    ${s.mood ? `<span style="font-size:1.5rem;margin-left:0.5rem">${s.mood}</span>` : ""}
    <h2 class="modal-title">${escapeHtml(s.title)}</h2>
    <p class="modal-body-text">${escapeHtml(s.text)}</p>
    <div class="modal-meta">
      <span>— ${escapeHtml(s.nickname || "Anonim")} · ${formatDate(s.date)}</span>
      <div class="modal-reactions">
        ${Object.entries(s.reactions).map(([emoji, count]) => `
          <button class="reaction-btn" onclick="react(event, ${s.id}, '${emoji}')">${emoji} ${count}</button>
        `).join("")}
      </div>
    </div>
  `;
  document.getElementById("storyModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(e) {
  if (!e || e.target === document.getElementById("storyModal") || e.currentTarget?.classList?.contains("modal-close")) {
    document.getElementById("storyModal").classList.remove("open");
    document.body.style.overflow = "";
  }
}

// ---- TEPKİ ----
function react(event, id, emoji) {
  event.stopPropagation();
  const s = stories.find(x => x.id === id);
  if (!s) return;
  s.reactions[emoji] = (s.reactions[emoji] || 0) + 1;
  saveStories();
  updateStats();
  renderHomeStories();
  if (document.getElementById("section-stories").classList.contains("active")) renderStories();
  if (document.getElementById("storyModal").classList.contains("open")) openStory(id);
  event.target.classList.add("reacted");
}

// ---- FORM ----
function selectMood(btn) {
  document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedMood = btn.dataset.mood;
}

function updateCharCount() {
  const text = document.getElementById("storyText")?.value || "";
  const counter = document.getElementById("charCount");
  if (counter) counter.textContent = text.length;
}

function submitStory(event) {
  event.preventDefault();

  const title = document.getElementById("storyTitle").value.trim();
  const text = document.getElementById("storyText").value.trim();
  const category = document.getElementById("storyCategory").value;
  const nickname = document.getElementById("nickname").value.trim();

  if (!title || !text || !category) { showToast("⚠️ Lütfen gerekli alanları doldurun.", "error"); return; }
  if (text.length < 50) { showToast("⚠️ Hikaye en az 50 karakter olmalı.", "error"); return; }

  const newStory = {
    id: Date.now(),
    title,
    text,
    category,
    nickname: nickname || "Anonim",
    mood: selectedMood,
    date: new Date().toISOString().split("T")[0],
    reactions: { "💙": 0, "🤗": 0, "💪": 0 }
  };

  stories.unshift(newStory);
  saveStories();
  updateStats();

  // Formu sıfırla
  document.getElementById("storyTitle").value = "";
  document.getElementById("storyText").value = "";
  document.getElementById("storyCategory").value = "";
  document.getElementById("nickname").value = "";
  document.getElementById("charCount").textContent = "0";
  document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("selected"));
  selectedMood = "";

  showToast("✅ Hikayen anonim olarak paylaşıldı!");
  setTimeout(() => showSection("stories"), 1200);
}

// ---- İSTATİSTİKLER ----
function updateStats() {
  const storyCountEl = document.getElementById("storyCount");
  const reactionCountEl = document.getElementById("reactionCount");
  if (storyCountEl) storyCountEl.textContent = stories.length;
  if (reactionCountEl) {
    const total = stories.reduce((acc, s) => acc + Object.values(s.reactions).reduce((a, b) => a + b, 0), 0);
    reactionCountEl.textContent = total;
  }
}

// ---- TOAST ----
function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.background = type === "error" ? "#c62828" : "var(--green-mid)";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ---- YARDIMCI ----
function escapeHtml(text) {
  if (!text) return "";
  return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}


// ---- ANKET ----
function submitSurvey() {
  const formArea = document.getElementById("survey-form-area");
  const thanks = document.getElementById("survey-thanks");
  if (formArea) formArea.style.display = "none";
  if (thanks) thanks.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}
// ---- BAŞLATMA ----
document.addEventListener("DOMContentLoaded", () => {
  loadStories();
  updateStats();
  renderHomeStories();
});
