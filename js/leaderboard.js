// js/leaderboard.js
// كود لوحة المتصدرين (Leaderboard) باستخدام نفس نظام المسابقة

// عناصر DOM
const leaderboardBox = document.createElement('div');
leaderboardBox.className = 'leaderboard_box';

leaderboardBox.innerHTML = `
    <div class="info-title"><span>لوحة المتصدرين</span></div>
    <div class="leaderboard-list"></div>
    <div class="buttons">
        <button class="quit">اغلاق</button>
    </div>
`;

document.body.appendChild(leaderboardBox);

const leaderboardList = leaderboardBox.querySelector('.leaderboard-list');
const leaderboardQuit = leaderboardBox.querySelector('.buttons .quit');

// دالة لجلب المتصدرين من Firebase
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const db = getDatabase();
const scoresRef = ref(db, 'scores');

function showLeaderboard() {
    leaderboardBox.classList.add('activeLeaderboard');
    leaderboardList.innerHTML = '<div>جاري التحميل...</div>';
    onValue(scoresRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            leaderboardList.innerHTML = '<div>لا يوجد بيانات بعد.</div>';
            return;
        }
        // تحويل البيانات لمصفوفة وترتيبها تنازلياً
        const arr = Object.entries(data).map(([name, score]) => ({ name, score }));
        arr.sort((a, b) => b.score - a.score);
        leaderboardList.innerHTML = arr.map((item, i) =>
            `<div style="font-size:22px;margin:8px 0;display:flex;justify-content:space-between;">
                <span>${i+1}. ${item.name}</span>
                <span>${item.score}</span>
            </div>`
        ).join('');
    });
}

// زر اغلاق
leaderboardQuit.onclick = () => {
    leaderboardBox.classList.remove('activeLeaderboard');
};

// زر لعرض المتصدرين (يمكنك وضعه في أي مكان مناسب)
const showLbBtn = document.createElement('button');
showLbBtn.textContent = 'عرض المتصدرين';
showLbBtn.style = 'position:fixed;top:20px;left:20px;z-index:10;padding:10px 20px;font-size:18px;background:#fff;color:#109204;border:1px solid #109204;border-radius:5px;cursor:pointer;';
document.body.appendChild(showLbBtn);
showLbBtn.onclick = showLeaderboard;

// دالة لحفظ نتيجة اللاعب (استدعيها عند نهاية المسابقة)
export function saveScoreToLeaderboard(name, score) {
    import('https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js').then(({ getDatabase, ref, set }) => {
        const db = getDatabase();
        set(ref(db, 'scores/' + name), score);
    });
}
