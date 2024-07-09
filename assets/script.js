let alarmTime = null;
let alarmTimeout = null;
let correctAnswer = 0;

function setAlarm() {
    const input = document.getElementById('alarmTime').value;
    if (!input) {
        alert('アラームを設定してください。');
        return;
    }

    const alarmDate = new Date();
    const [hours, minutes] = input.split(':');
    alarmDate.setHours(hours);
    alarmDate.setMinutes(minutes);
    alarmDate.setSeconds(0);

    const now = new Date();
    const timeToAlarm = alarmDate.getTime() - now.getTime();

    if (timeToAlarm < 0) {
        alert('選択された時刻はすでに過ぎています。未来の時間を選択してください。');
        return;
    }

    document.getElementById('status').textContent = `アラームを${input}に設定しました`;
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }
    alarmTimeout = setTimeout(() => {
        document.getElementById('status').textContent = '起きて！';
        if (confirm('起きて！ 問題をクリアしてアラームを止めよう')) {
            document.getElementById('alarmSound').play();
            showMathChallenge();
        }
    }, timeToAlarm);
}

function showMathChallenge() {
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;
    correctAnswer = num1 + num2;
    document.getElementById('question').textContent = `問題：${num1} + ${num2} = ?`;
    document.getElementById('mathChallenge').style.display = 'block';
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    if (userAnswer === correctAnswer) {
        document.getElementById('status').textContent = '正解！アラームが止まります。'
        // document.getElementById('feedback').textContent = '正解！アラームが止まりました。';
        document.getElementById('alarmSound').pause();
        document.getElementById('alarmSound').currentTime = 0;
        document.getElementById('mathChallenge').style.display = 'none';
    } else {
        document.getElementById('feedback').textContent = '不正解。 計算し直してください';
    }
}
