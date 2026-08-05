import axios from 'axios';

// Gemini API integration — talks directly to the external Gemini endpoint
// (not the Django backend), so it uses raw axios instead of apiClient.
export const askAI = async (prompt, userRole) => {
  const apiKey = localStorage.getItem('gemini_api_key');

  // Choose appropriate system instructions
  let systemPrompt = "You are an AI assistant in Bright Future Homeschooling System.";
  if (userRole === 'STUDENT') {
    systemPrompt = "You are the 'AI Study Buddy' (Gemini/Claude theme). Help primary school children understand concepts easily. Give very short, encouraging, kid-friendly explanations. Use visual formatting like emojis or small ASCII sketches. Conclude with a fun follow-up question!";
  } else if (userRole === 'TEACHER') {
    systemPrompt = "You are the 'AI Lesson Planner'. Help teachers construct engaging primary school lectures, worksheets, and syllabus checklists. Provide clear, structured, professional text outputs that are copy-paste ready.";
  } else if (userRole === 'PARENT') {
    systemPrompt = "You are the 'AI Family Counselor'. Advise parents on strategies to support their child's educational progress based on their grades, recitation status, or behavior notes. Keep answers warm, encouraging, and supportive.";
  }

  if (apiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const res = await axios.post(url, {
        contents: [{
          parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }]
        }]
      });
      const replyText = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (replyText) return replyText;
    } catch (error) {
      console.error('Gemini API call failed, falling back to local model:', error.message);
    }
  }

  // Local simulated stream fallback response based on keywords
  return new Promise((resolve) => {
    setTimeout(() => {
      const query = prompt.toLowerCase();

      if (userRole === 'STUDENT') {
        if (query.includes('math') || query.includes('addition') || query.includes('plus')) {
          resolve("🔢 **Hello Zayd! Let's do Math!**\n\nAddition is like gathering toys in a single box. If you have **3 green cars** and I give you **2 red cars**, let's count them together:\n🚗🚗🚗 + 🚗🚗 = **5 cars in total!**\n\nIsn't that cool? Try this one: What is **4 + 4**? Count them on your fingers! 🌟");
        } else if (query.includes('quran') || query.includes('surah') || query.includes('ayat')) {
          resolve("🌙 **Assalam-o-Alaikum Zayd!**\n\nSurah Al-Baqarah is the longest Surah in the Quran and contains beautiful lessons about goodness, praying, and sharing. Keep up your Nazra reading! You are doing amazing. \n\nWhat is your favorite Surah to recite? 📖");
        } else if (query.includes('python') || query.includes('code') || query.includes('loop')) {
          resolve("🐍 **Python Coding Lab!**\n\nA variables is like a named jar where you store secrets. E.g.\n`apples = 5`\nAnd a loop tells Python to repeat something, like drawing a circle: `for i in range(3): print('Spin!')`\n\nDo you want to write a game script together? 🎮");
        } else {
          resolve("🤖 **Hey Zayd, I'm your AI Study Buddy!**\n\nI can help you with Math, English spelling, Quran stories, or coding blocks! Ask me anything, or tell me what lesson you are studying today. \n\nWhat topic should we explore? ✨");
        }
      }

      else if (userRole === 'TEACHER') {
        if (query.includes('lesson') || query.includes('math') || query.includes('addition')) {
          resolve("📋 **Primary Math Lesson Planner (Single-Digit Addition)**\n\n**1. Concept Introduction**\nUse concrete objects (apples, blocks) to illustrate pooling sets.\n\n**2. Sample Word Problems**\n- Zayd has 3 blue marbles. Ustadh Ahmed gives him 4 yellow marbles. How many marbles does he have in total?\n\n**3. Short Quiz**\n1. 2 + 5 = ?\n2. 6 + 3 = ?\n3. 8 + 1 = ?\n\n**Copy-paste this outline to your LMS lesson body!**");
        } else {
          resolve("📋 **Lesson & Quiz Planner**\n\nProvide the topic you want to teach (e.g. Arabic Tajweed rules, English grammar, Python coding) and I will generate a structured lesson guide, printable worksheets, and quizzes for your students.");
        }
      }

      else if (userRole === 'PARENT') {
        resolve("🌱 **Family counselor recommendations for Zayd:**\n\nBased on Zayd's current records:\n1. **Academic Gaps**: Zayd scored 85% on the Admission Assessment, showing strong logical reasoning but needs extra writing exercises to increase speed.\n2. **Tarbiyah Action Plan**: Encourage reading aloud for 10 minutes every evening. Work on spelling exercises together using fun word games.\n3. **Quran Recitations**: Ustadh Ahmed reports Zayd is highly focused on Al-Baqarah. Support him by reciting together before sleeping.");
      }
    }, 1200); // simulate minor loading lag
  });
};
