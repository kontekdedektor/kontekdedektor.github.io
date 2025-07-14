// Bu dosya, Gemini API kullanarak akıllı alan analizi yapar.

document.addEventListener('DOMContentLoaded', function() {
    const geminiForm = document.getElementById('gemini-form');
    // Form yoksa script'i çalıştırma
    if (!geminiForm) return;

    const submitButton = document.getElementById('gemini-submit-btn');
    const spinner = document.getElementById('gemini-spinner-container');
    const responseCard = document.getElementById('gemini-response-card');

    geminiForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const targetObject = document.getElementById('target-object').value;
        const soilType = document.getElementById('soil-type').value;
        const description = document.getElementById('site-description').value;
        const currentLang = localStorage.getItem('language') || 'tr';

        if (!description.trim()) {
            alert(currentLang === 'tr' ? 'Lütfen arama alanı açıklamasını girin.' : 'Please enter the search area description.');
            return;
        }

        spinner.classList.remove('hidden');
        responseCard.classList.add('hidden');
        submitButton.disabled = true;
        submitButton.classList.add('opacity-50', 'cursor-not-allowed');

        const prompt = `
            Sen, KTD (Konya Teknoloji Dedektör) adlı bir şirket için çalışan, jeofizik ve yeraltı görüntüleme alanında uzman bir yapay zeka asistanısın. Görevin, kullanıcıların verdiği bilgilere dayanarak profesyonel bir ön alan analizi yapmak ve onlara en uygun KTD cihazını önermektir. Cevabın hem bilgilendirici hem de KTD ürünlerini tanıtıcı olmalıdır.

            Kullanıcının verdiği bilgiler:
            - Aranacak Hedef: ${targetObject}
            - Zemin Tipi: ${soilType}
            - Alan Açıklaması: ${description}

            Lütfen aşağıdaki formatı kullanarak bir analiz raporu oluştur:

            <h4>Genel Değerlendirme</h4>
            <p>[Burada, verilen bilgilere göre arama başarısı potansiyelini, riskleri ve olasılıkları profesyonel bir dille analiz et.]</p>

            <h4>Cihaz Önerisi</h4>
            <p>[Bu özel görev için nedenini açıklayarak en uygun KTD cihazını (KTD-100, KTD-200 Pro, veya KTD-300 Ultra) öner. Cihazın ilgili özelliklerini vurgula.]</p>
            
            <h4>Arazi Çalışması İçin İpuçları</h4>
            <ul>
            <li>[Bu tür bir zeminde ve hedef için dikkat edilmesi gereken 3-4 pratik ipucu veya uyarıyı madde imli liste olarak yaz.]</li>
            </ul>

            <h4>Tahmini Zorluk Seviyesi</h4>
            <p>[Bu aramanın zorluk seviyesini (Kolay, Orta, Zor) belirt ve nedenini kısaca açıkla.]</p>
        `;

        try {
            const apiKey = "AIzaSyCbS68HsneTzqDqolDasaa_wKIQJHrWq_c";

            if (apiKey === "YAPAY_ZEKA_API_ANAHTARINIZI_BURAYA_GIRIN") {
                throw new Error(currentLang === 'tr' ? "Lütfen kodun içindeki API anahtarı bölümünü güncelleyin." : "Please update the API Key section in the code.");
            }

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] })
            });

            const result = await response.json();

            if (!response.ok) {
                let errorMsg = (currentLang === 'tr') 
                    ? `API Hatası: ${response.status}.` 
                    : `API Error: ${response.status}.`;
                if (result.error && result.error.message) {
                    errorMsg += (currentLang === 'tr') ? ` Detaylar: ${result.error.message}` : ` Details: ${result.error.message}`;
                }
                throw new Error(errorMsg);
            }
            
            if (!result.candidates || result.candidates.length === 0) {
                let blockReason = (currentLang === 'tr') ? "Bilinmeyen bir sebep." : "Unknown reason.";
                if (result.promptFeedback && result.promptFeedback.blockReason) {
                    blockReason = (currentLang === 'tr') 
                        ? `İçerik güvenlik sebebiyle engellendi: ${result.promptFeedback.blockReason}`
                        : `Content blocked for safety reasons: ${result.promptFeedback.blockReason}`;
                }
                 throw new Error((currentLang === 'tr' ? 'Yapay zekadan geçerli bir yanıt alınamadı. Sebep: ' : 'Could not get a valid response from the AI. Reason: ') + blockReason);
            }

            const analysisText = result.candidates[0].content.parts[0].text;

            responseCard.innerHTML = analysisText;
            responseCard.classList.remove('hidden');
            responseCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (error) {
            console.error('Gemini API Hatası:', error);
            responseCard.innerHTML = `<p class="text-red-400">${error.message}</p>`;
            responseCard.classList.remove('hidden');
        } finally {
            spinner.classList.add('hidden');
            submitButton.disabled = false;
            submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    });
});
