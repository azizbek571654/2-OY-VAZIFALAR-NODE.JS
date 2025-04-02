// API so'rovlarni amalga oshirish uchun funksiyalar
const API_URL = '/api/users';

// Barcha foydalanuvchilarni olish
async function fetchUsers() {
  const usersList = document.getElementById('usersList');
  const loader = document.getElementById('loader');
  
  try {
    usersList.classList.add('loading');
    loader.style.display = 'block';
    
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Server xatoligi: ${response.status}`);
    }
    
    const users = await response.json();
    displayUsers(users);
    
  } catch (error) {
    console.error('Ma\'lumotlarni olishda xatolik:', error);
    showMessage('error', 'Foydalanuvchilar ma\'lumotlarini olishda xatolik yuz berdi.');
  } finally {
    loader.style.display = 'none';
    usersList.classList.remove('loading');
  }
}

// Foydalanuvchilarni ekranda ko'rsatish
function displayUsers(users) {
  const usersList = document.getElementById('usersList');
  
  if (users.length === 0) {
    usersList.innerHTML = '<p class="no-users">Foydalanuvchilar topilmadi</p>';
    return;
  }
  
  const usersHTML = users.map(user => `
    <div class="user-card">
      <div class="user-name">${user.name}</div>
      <div class="user-email">${user.email}</div>
    </div>
  `).join('');
  
  usersList.innerHTML = usersHTML;
}

// Yangi foydalanuvchi qo'shish
async function submitForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  
  // Ma'lumotlarni tekshirish
  if (!name || !email) {
    showMessage('error', 'Barcha maydonlarni to\'ldiring');
    return;
  }
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Foydalanuvchini qo\'shishda xatolik');
    }
    
    // Muvaffaqiyatli qo'shilgan
    showMessage('success', 'Foydalanuvchi muvaffaqiyatli qo\'shildi');
    form.reset();
    
    // Foydalanuvchilar ro'yxatini yangilash
    fetchUsers();
    
  } catch (error) {
    console.error('Foydalanuvchi qo\'shishda xatolik:', error);
    showMessage('error', error.message);
  }
}

// Xabarlarni ko'rsatish
function showMessage(type, text) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = text;
  messageElement.className = `message ${type}`;
  
  // 5 soniyadan keyin xabarni o'chirish
  setTimeout(() => {
    messageElement.className = 'message';
    messageElement.textContent = '';
  }, 5000);
}

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', () => {
  // Foydalanuvchilar ro'yxatini yuklash
  fetchUsers();
  
  // Forma jo'natishni qayta ishlash
  const form = document.getElementById('userForm');
  form.addEventListener('submit', submitForm);
});