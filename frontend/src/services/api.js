import axios from 'axios';

// We point requests to relative routes, which Vite proxies to http://127.0.0.1:8000
const API_URL = '/api';

// Create axios instance
const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- COMPREHENSIVE MOCK DATABASE FOR FALLBACK MODE ---
const MOCK_DATA = {
  users: [
    { id: 1, username: 'admin', role: 'ADMIN', email: 'admin@brightfuture.edu.pk', name: 'System Administrator' },
    { id: 2, username: 'teacher_ahmed', role: 'TEACHER', email: 'ahmed@brightfuture.edu.pk', name: 'Ustadh Ahmed Bilal', teacher_profile: { qualification: 'M.Phil Islamic Studies & Arabic', specialization: 'Hifz & Tajweed Methodology' } },
    { id: 3, username: 'student_zayd', role: 'STUDENT', email: 'zayd@brightfuture.edu.pk', name: 'Zayd Ahmed Bilal', student_profile: { parent: 4, date_of_birth: '2015-05-12', current_level: 'PRIMARY' } },
    { id: 4, username: 'parent_ahmed', role: 'PARENT', email: 'ahmed_parent@gmail.com', name: 'Ahmed Bilal Senior' }
  ],
  // Extended directory used by Admin / Teacher / Parent overview dashboards.
  // Kept at a realistic homeschool scale (not a large-institution row count).
  teachers: [
    { id: 1, user: 2, name: 'Ustadh Ahmed Bilal', email: 'ahmed@brightfuture.edu.pk', qualification: 'M.Phil Islamic Studies & Arabic', specialization: 'Hifz & Tajweed Methodology', avatar_color: 'emerald' },
    { id: 2, user: 6, name: 'Ms. Sara Khan', email: 'sara.khan@brightfuture.edu.pk', qualification: 'B.Ed English Literature', specialization: 'Primary English & Phonics', avatar_color: 'indigo' },
    { id: 3, user: 7, name: 'Mr. Bilal Raza', email: 'bilal.raza@brightfuture.edu.pk', qualification: 'M.Sc Mathematics', specialization: 'Math & Science (Middle/O-Level)', avatar_color: 'amber' },
    { id: 4, user: 8, name: 'Mrs. Ayesha Malik', email: 'ayesha.malik@brightfuture.edu.pk', qualification: 'Montessori Diploma', specialization: 'Early Years Sensorial Development', avatar_color: 'pink' }
  ],
  students: [
    { id: 1, user: 3, name: 'Zayd Ahmed Bilal', email: 'zayd@brightfuture.edu.pk', parent: 4, current_level: 'PRIMARY', date_of_birth: '2015-05-12' },
    { id: 2, user: 5, name: 'Esa Noor', email: 'esa@brightfuture.edu.pk', parent: 4, current_level: 'MONTESSORI', date_of_birth: '2021-03-02' },
    { id: 3, user: 9, name: 'Maryam Ahmed', email: 'maryam.ahmed@brightfuture.edu.pk', parent: 10, current_level: 'PRIMARY', date_of_birth: '2016-01-20' },
    { id: 4, user: 11, name: 'Yusuf Khan', email: 'yusuf.khan@brightfuture.edu.pk', parent: 12, current_level: 'MIDDLE', date_of_birth: '2013-08-11' },
    { id: 5, user: 13, name: 'Fatima Ali', email: 'fatima.ali@brightfuture.edu.pk', parent: 14, current_level: 'O_LEVEL', date_of_birth: '2011-02-18' },
    { id: 6, user: 15, name: 'Hassan Raza', email: 'hassan.raza@brightfuture.edu.pk', parent: 16, current_level: 'PRIMARY', date_of_birth: '2016-11-05' },
    { id: 7, user: 17, name: 'Aisha Malik', email: 'aisha.malik@brightfuture.edu.pk', parent: 18, current_level: 'MONTESSORI', date_of_birth: '2020-09-14' },
    { id: 8, user: 19, name: 'Bilal Ahmed', email: 'bilal.ahmed@brightfuture.edu.pk', parent: 16, current_level: 'GED', date_of_birth: '2009-04-23' },
    { id: 9, user: 20, name: 'Zainab Noor', email: 'zainab.noor@brightfuture.edu.pk', parent: 12, current_level: 'MIDDLE', date_of_birth: '2014-07-30' },
    { id: 10, user: 21, name: 'Ibrahim Sheikh', email: 'ibrahim.sheikh@brightfuture.edu.pk', parent: 22, current_level: 'PRIMARY', date_of_birth: '2017-06-09' },
    { id: 11, user: 23, name: 'Khadija Farooq', email: 'khadija.farooq@brightfuture.edu.pk', parent: 18, current_level: 'MONTESSORI', date_of_birth: '2021-12-01' },
    { id: 12, user: 24, name: 'Omar Siddiqui', email: 'omar.siddiqui@brightfuture.edu.pk', parent: 22, current_level: 'O_LEVEL', date_of_birth: '2010-10-27' }
  ],
  parents: [
    { id: 1, user: 4, name: 'Ahmed Bilal Senior', email: 'ahmed_parent@gmail.com', phone: '+92 300 1234567', children: ['Zayd Ahmed Bilal', 'Esa Noor'] },
    { id: 2, user: 10, name: 'Farhan Ahmed', email: 'farhan.ahmed@gmail.com', phone: '+92 301 2345678', children: ['Maryam Ahmed'] },
    { id: 3, user: 12, name: 'Farhan Khan', email: 'farhan.khan@gmail.com', phone: '+92 302 3456789', children: ['Yusuf Khan', 'Zainab Noor'] },
    { id: 4, user: 14, name: 'Imran Ali', email: 'imran.ali@gmail.com', phone: '+92 303 4567890', children: ['Fatima Ali'] },
    { id: 5, user: 16, name: 'Rashid Raza', email: 'rashid.raza@gmail.com', phone: '+92 304 5678901', children: ['Hassan Raza', 'Bilal Ahmed'] },
    { id: 6, user: 18, name: 'Nadia Malik', email: 'nadia.malik@gmail.com', phone: '+92 305 6789012', children: ['Aisha Malik', 'Khadija Farooq'] },
    { id: 7, user: 22, name: 'Salman Sheikh', email: 'salman.sheikh@gmail.com', phone: '+92 306 7890123', children: ['Ibrahim Sheikh', 'Omar Siddiqui'] }
  ],
  attendance_logs: [
    // Last 5 school days across the roster; STUDENT ids reference the `students` array above.
    { id: 1, student: 1, date: '2026-07-29', status: 'PRESENT' }, { id: 2, student: 1, date: '2026-07-30', status: 'PRESENT' }, { id: 3, student: 1, date: '2026-07-31', status: 'ABSENT' }, { id: 4, student: 1, date: '2026-08-03', status: 'PRESENT' }, { id: 5, student: 1, date: '2026-08-04', status: 'PRESENT' },
    { id: 6, student: 2, date: '2026-07-29', status: 'PRESENT' }, { id: 7, student: 2, date: '2026-07-30', status: 'PRESENT' }, { id: 8, student: 2, date: '2026-07-31', status: 'PRESENT' }, { id: 9, student: 2, date: '2026-08-03', status: 'LATE' }, { id: 10, student: 2, date: '2026-08-04', status: 'PRESENT' },
    { id: 11, student: 3, date: '2026-07-29', status: 'PRESENT' }, { id: 12, student: 3, date: '2026-07-30', status: 'ABSENT' }, { id: 13, student: 3, date: '2026-07-31', status: 'PRESENT' }, { id: 14, student: 3, date: '2026-08-03', status: 'PRESENT' }, { id: 15, student: 3, date: '2026-08-04', status: 'PRESENT' },
    { id: 16, student: 4, date: '2026-08-03', status: 'PRESENT' }, { id: 17, student: 4, date: '2026-08-04', status: 'PRESENT' },
    { id: 18, student: 5, date: '2026-08-03', status: 'PRESENT' }, { id: 19, student: 5, date: '2026-08-04', status: 'LATE' },
    { id: 20, student: 6, date: '2026-08-03', status: 'PRESENT' }, { id: 21, student: 6, date: '2026-08-04', status: 'PRESENT' },
    { id: 22, student: 7, date: '2026-08-03', status: 'PRESENT' }, { id: 23, student: 7, date: '2026-08-04', status: 'PRESENT' },
    { id: 24, student: 8, date: '2026-08-03', status: 'ABSENT' }, { id: 25, student: 8, date: '2026-08-04', status: 'PRESENT' },
    { id: 26, student: 9, date: '2026-08-03', status: 'PRESENT' }, { id: 27, student: 9, date: '2026-08-04', status: 'PRESENT' },
    { id: 28, student: 10, date: '2026-08-03', status: 'PRESENT' }, { id: 29, student: 10, date: '2026-08-04', status: 'PRESENT' },
    { id: 30, student: 11, date: '2026-08-03', status: 'PRESENT' }, { id: 31, student: 11, date: '2026-08-04', status: 'PRESENT' },
    { id: 32, student: 12, date: '2026-08-03', status: 'PRESENT' }, { id: 33, student: 12, date: '2026-08-04', status: 'PRESENT' }
  ],
  programs: [
    { id: 1, name: 'MONTESSORI', name_display: 'Montessori Development', description: 'Montessori development program for kids (Age 3-5)' },
    { id: 2, name: 'PRIMARY', name_display: 'Primary (Grade 1-5)', description: 'Primary School curriculum for Grade 1 to 5' },
    { id: 3, name: 'MIDDLE', name_display: 'Middle School (Grade 6-8)', description: 'Middle School curriculum for Grade 6 to 8' },
    { id: 4, name: 'O_LEVEL', name_display: 'O Levels', description: 'O Levels Cambridge examinations prep' },
    { id: 5, name: 'GED', name_display: 'GED Credential', description: 'General Educational Development certification' }
  ],
  courses: [
    { id: 1, program: 1, name: 'Montessori Sensorial Activities', code: 'MON-SEN', syllabus: 'Sensory training for cognitive intelligence.' },
    { id: 2, program: 2, name: 'Mathematics Grade 1', code: 'MAT-01', syllabus: 'Basic arithmetic, counting, and shape geometry.' },
    { id: 3, program: 2, name: 'English Language Foundations', code: 'ENG-01', syllabus: 'Grammar building, reading comprehension, and phonics.' },
    { id: 4, program: 4, name: 'O-Level Physics', code: 'PHY-5054', syllabus: 'Cambridge Physics syllabus covering mechanics, thermal, and waves.' }
  ],
  classrooms: [
    { id: 1, name: 'Primary Math Explorers', course: { name: 'Mathematics Grade 1', code: 'MAT-01' }, teacher: 'Ustadh Ahmed Bilal', room: 'Room 101', students: ['Zayd Ahmed Bilal', 'Maryam Ahmed', 'Hassan Raza', 'Ibrahim Sheikh'] },
    { id: 2, name: 'English Foundations Circle', course: { name: 'English Language Foundations', code: 'ENG-01' }, teacher: 'Ms. Sara Khan', room: 'Room 102', students: ['Zayd Ahmed Bilal', 'Maryam Ahmed'] },
    { id: 3, name: 'Montessori Sensorial Studio', course: { name: 'Montessori Sensorial Activities', code: 'MON-SEN' }, teacher: 'Mrs. Ayesha Malik', room: 'Room 3 (Sensory Lab)', students: ['Esa Noor', 'Aisha Malik', 'Khadija Farooq'] },
    { id: 4, name: 'O-Level Physics Lab', course: { name: 'O-Level Physics', code: 'PHY-5054' }, teacher: 'Mr. Bilal Raza', room: 'Room 204', students: ['Fatima Ali', 'Omar Siddiqui'] }
  ],
  timetable: [
    { id: 1, classroom: 'Primary Math Explorers', day: 'Monday', time: '09:00 AM - 10:00 AM', resource: 'https://zoom.us/j/mockclassroom1' },
    { id: 2, classroom: 'English Foundations Circle', day: 'Monday', time: '10:15 AM - 11:15 AM', resource: 'https://zoom.us/j/mockclassroom2' },
    { id: 3, classroom: 'O-Level Physics Lab', day: 'Monday', time: '11:30 AM - 12:30 PM', resource: 'https://zoom.us/j/mockclassroom4' },
    { id: 4, classroom: 'Primary Math Explorers', day: 'Wednesday', time: '09:00 AM - 10:00 AM', resource: 'https://zoom.us/j/mockclassroom1' },
    { id: 5, classroom: 'Montessori Sensorial Studio', day: 'Wednesday', time: '10:00 AM - 10:45 AM', resource: 'https://zoom.us/j/mockclassroom3' }
  ],
  lessons: [
    { id: 1, course: 2, title: 'Introduction to Single-Digit Addition', content_body: 'In this lesson we learn how to add single digit numbers (e.g. 2+3=5) using visual items like apples and blocks.', video_url: 'https://www.youtube.com/embed/Fe8u2I1o78g', zoom_link: 'https://zoom.us/j/mockclassroom1', scheduled_time: '2026-07-20T10:00:00Z' },
    { id: 2, course: 2, title: 'Understanding Subtraction via Counting Back', content_body: 'Learn to subtract numbers by starting at the larger number and counting backwards.', video_url: 'https://www.youtube.com/embed/px6M2uW0Vxs', zoom_link: 'https://zoom.us/j/mockclassroom1', scheduled_time: '2026-07-22T10:00:00Z' }
  ],
  assignments: [
    { id: 1, lesson: 1, title: 'Single-Digit Addition Exercise Sheet', instructions: 'Solve all 10 addition problems on page 24 of your handbook and upload a photo of your completed page.', due_date: '2026-07-25T23:59:59Z' },
    { id: 2, lesson: 2, title: 'Subtraction Practice Worksheet', instructions: 'Complete the 12 subtraction problems using the counting-back method shown in class.', due_date: '2026-08-06T18:00:00Z' },
    { id: 3, lesson: 2, title: 'Number Line Word Problems', instructions: 'Solve the 5 word problems using a number line diagram for each answer.', due_date: '2026-08-12T18:00:00Z' }
  ],
  submissions: [
    { id: 1, assignment: 1, student: 3, submitted_at: '2026-07-18T09:12:00Z', file_attachment: 'addition_hw.pdf', grade: 'A', teacher_feedback: 'Excellent work Zayd! All answers are correct and your handwriting is very neat.' },
    { id: 2, assignment: 2, student: 9, submitted_at: '2026-08-02T14:30:00Z', file_attachment: 'subtraction_hw.pdf', grade: null, teacher_feedback: null },
    { id: 3, assignment: 1, student: 15, submitted_at: '2026-07-19T08:45:00Z', file_attachment: 'addition_hw_hassan.pdf', grade: 'B', teacher_feedback: 'Good effort Hassan, review problems 6 and 9 together next class.' }
  ],
  islamic_profile: {
    student: 3,
    current_surah: 'Al-Baqarah',
    current_ayat: 142,
    hifz_completed_pages: 18.5,
    tajweed_level: 'INTERMEDIATE'
  },
  islamic_logs: [
    { id: 1, date: '2026-07-17', type: 'HIFAZ', surah_name: 'Al-Baqarah', from_ayat: 135, to_ayat: 141, evaluation_grade: 'EXCELLENT', tarbiyah_notes: 'Highly focused during recitation. Addressed previous pronunciation mistakes.' },
    { id: 2, date: '2026-07-18', type: 'TAJWEED', surah_name: 'Al-Baqarah', from_ayat: 142, to_ayat: 142, evaluation_grade: 'GOOD', tarbiyah_notes: 'Practicing Madd rules today. Needs slightly more breath support.' }
  ],
  skill_tracks: [
    { id: 1, name: 'AI', name_display: 'Artificial Intelligence', level: 'BEGINNER', description: 'Introduction to AI models, neural network basics, and prompt engineering' },
    { id: 2, name: 'PYTHON', name_display: 'Python Coding', level: 'BEGINNER', description: 'Core python: variables, conditionals, loops, lists, and basic gaming' },
    { id: 3, name: 'ROBOTICS', name_display: 'Robotics & Hardware', level: 'BEGINNER', description: 'Basic circuits, Arduino simulators, and motor logical control' }
  ],
  skill_progress: [
    { id: 1, student: 3, track: 1, progress_percent: 65, completed_projects_count: 2, last_active: '2026-07-18T10:00:00Z' },
    { id: 2, student: 3, track: 2, progress_percent: 30, completed_projects_count: 1, last_active: '2026-07-16T11:00:00Z' }
  ],
  projects: [
    { id: 1, student: 3, track: 1, title: 'My First Intelligent Chatbot Prompt Guide', project_url: 'https://github.com/zayd/ai-prompts', grade: 'Pass', teacher_review: 'Excellent prompt designs showing a clear understanding of system styling prompts.', submitted_at: '2026-07-10T12:00:00Z' }
  ],
  exams: [
    { id: 1, course: 2, title: 'Term 1 Mathematics Assessment', duration_minutes: 30, ai_proctoring_enabled: true, questions: [
      { id: 1, text: 'What is 5 + 7?', type: 'MCQ', options: ['10', '11', '12', '13'], correct_answer: '12' },
      { id: 2, text: 'If you have 8 apples and eat 3, how many apples do you have left?', type: 'MCQ', options: ['4', '5', '6', '7'], correct_answer: '5' },
      { id: 3, text: 'Explain how addition and subtraction are opposite operations.', type: 'SUBJECTIVE', correct_answer: 'Subtraction undoes addition.' }
    ]}
  ],
  exam_attempts: [
    { id: 1, student: 3, exam: 1, score: 92.50, started_at: '2026-07-12T10:00:00Z', submitted_at: '2026-07-12T10:25:00Z' }
  ],
  violations: [
    { id: 1, attempt: 1, timestamp: '2026-07-12T10:15:00Z', violation_type: 'TAB_SWITCH', confidence_score: 99.00 }
  ],
  fee_structures: [
    { id: 1, program: 'MONTESSORI', monthly_tuition: 8000.00, admission_fee: 15000.00 },
    { id: 2, program: 'PRIMARY', monthly_tuition: 12000.00, admission_fee: 20000.00 },
    { id: 3, program: 'O_LEVEL', monthly_tuition: 25000.00, admission_fee: 35000.00 }
  ],
  invoices: [
    { id: 1, student: 3, student_name: 'Zayd Ahmed Bilal', amount: '12000.00', status: 'UNPAID', due_date: '2026-07-31', issue_date: '2026-07-15', payment_method: 'PENDING' },
    { id: 2, student: 3, student_name: 'Zayd Ahmed Bilal', amount: '12000.00', status: 'PAID', due_date: '2026-06-30', issue_date: '2026-06-15', payment_method: 'BANK_TRANSFER' },
    { id: 3, student: 11, student_name: 'Yusuf Khan', amount: '18000.00', status: 'UNPAID', due_date: '2026-08-10', issue_date: '2026-07-25', payment_method: 'PENDING' },
    { id: 4, student: 13, student_name: 'Fatima Ali', amount: '25000.00', status: 'PAID', due_date: '2026-07-20', issue_date: '2026-07-05', payment_method: 'CREDIT_CARD' },
    { id: 5, student: 21, student_name: 'Ibrahim Sheikh', amount: '12000.00', status: 'UNPAID', due_date: '2026-08-08', issue_date: '2026-07-24', payment_method: 'PENDING' }
  ],
  salaries: [
    { id: 1, teacher: 2, teacher_name: 'Ustadh Ahmed Bilal', base_salary: '45000.00', allowances: '5000.00', month: '2026-07-01', is_paid: true }
  ],
  assessment_results: [
    {
      id: 1,
      student: 3,
      assessment: { title: 'General Admission Assessment' },
      score: 85.00,
      strengths: 'Zayd shows exceptional logical skills and quick memory retrieval. Excellent recitation pitch.',
      weaknesses: 'Requires extra writing practice to match speed expectations. Sometimes rushes through arithmetic calculations.',
      learning_gaps: 'Basic reading fluency needs reinforcement. Writing spelling rules need attention.',
      recommendations: 'Integrate writing activities into daily lessons. Provide guided reading exercises daily.',
      shared_with_parents: true,
      created_at: '2026-07-14T09:00:00Z'
    }
  ],
  chat_messages: [
    { id: 1, sender: 2, sender_username: 'teacher_ahmed', recipient: 3, recipient_username: 'student_zayd', message: "Assalam-o-Alaikum Zayd, I hope you are practicing your addition exercises! Don't forget to submit the worksheet today.", timestamp: '2026-07-18T08:00:00Z', is_read: true },
    { id: 2, sender: 3, sender_username: 'student_zayd', recipient: 2, recipient_username: 'teacher_ahmed', message: "Walaikum Assalam Ustadh, yes I am almost done with the sheet, I will upload it in a few minutes!", timestamp: '2026-07-18T08:05:00Z', is_read: true },
    { id: 3, sender: 2, sender_username: 'teacher_ahmed', recipient: 4, recipient_username: 'parent_ahmed', message: "Assalam-o-Alaikum Ahmed Sahab, Zayd did a fantastic job on his addition worksheet today. Very neat handwriting and all correct!", timestamp: '2026-08-02T15:20:00Z', is_read: true },
    { id: 4, sender: 4, sender_username: 'parent_ahmed', recipient: 2, recipient_username: 'teacher_ahmed', message: "Walaikum Assalam Ustadh, that's great to hear, JazakAllah for the update. We'll keep practicing at home too.", timestamp: '2026-08-02T16:05:00Z', is_read: true }
  ]
};

// State manager for Mock Database (simulating real backend changes in memory)
let localMockState = { ...MOCK_DATA };

// API Wrapper
export const api = {
  // Authentication
  login: async (username, password) => {
    try {
      const response = await apiInstance.post('/auth/login/', { username, password });
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // Get role and user details
      const userRes = await apiInstance.get('/users/me/');
      return userRes.data;
    } catch (error) {
      console.warn('Backend login failed, using local mock login logic:', error.message);
      // Fallback: search mock database
      const user = localMockState.users.find(u => u.username === username);
      if (user) {
        localStorage.setItem('access_token', 'mock_jwt_token_' + user.role);
        return {
          id: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
          name: user.name,
          profile: user.role === 'TEACHER' ? user.teacher_profile : (user.role === 'STUDENT' ? user.student_profile : {})
        };
      }
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  getCurrentUser: async () => {
    try {
      const response = await apiInstance.get('/users/me/');
      return response.data;
    } catch (error) {
      const token = localStorage.getItem('access_token');
      if (token && token.startsWith('mock_jwt_token_')) {
        const role = token.replace('mock_jwt_token_', '');
        const user = localMockState.users.find(u => u.role === role);
        return {
          ...user,
          profile: role === 'TEACHER' ? user.teacher_profile : (role === 'STUDENT' ? user.student_profile : {})
        };
      }
      throw new Error('Not authenticated');
    }
  },

  // Programs & Courses
  getPrograms: async () => {
    try {
      const res = await apiInstance.get('/curriculum/programs/');
      return res.data;
    } catch (e) {
      return localMockState.programs;
    }
  },

  getCourses: async () => {
    try {
      const res = await apiInstance.get('/curriculum/courses/');
      return res.data;
    } catch (e) {
      return localMockState.courses;
    }
  },

  getClassrooms: async () => {
    try {
      const res = await apiInstance.get('/curriculum/classrooms/');
      return res.data;
    } catch (e) {
      return localMockState.classrooms;
    }
  },

  getTimetableSlots: async () => {
    try {
      const res = await apiInstance.get('/curriculum/slots/');
      return res.data;
    } catch (e) {
      return localMockState.timetable;
    }
  },

  getStudents: async () => {
    try {
      const res = await apiInstance.get('/users/students/');
      return res.data.map(s => ({
        ...s,
        name: s.user && typeof s.user === 'object' ? `${s.user.first_name} ${s.user.last_name}`.trim() || s.user.username : s.name,
        email: s.user && typeof s.user === 'object' ? s.user.email : s.email,
        user: s.user && typeof s.user === 'object' ? s.user.id : s.user
      }));
    } catch (e) {
      return localMockState.students;
    }
  },

  getTeachers: async () => {
    try {
      const res = await apiInstance.get('/users/teachers/');
      return res.data.map(t => ({
        ...t,
        name: t.user && typeof t.user === 'object' ? `${t.user.first_name} ${t.user.last_name}`.trim() || t.user.username : t.name,
        email: t.user && typeof t.user === 'object' ? t.user.email : t.email,
        user: t.user && typeof t.user === 'object' ? t.user.id : t.user
      }));
    } catch (e) {
      return localMockState.teachers;
    }
  },

  getParents: async () => {
    try {
      const res = await apiInstance.get('/users/parents/');
      return res.data.map(p => ({
        ...p,
        name: p.user && typeof p.user === 'object' ? `${p.user.first_name} ${p.user.last_name}`.trim() || p.user.username : p.name,
        email: p.user && typeof p.user === 'object' ? p.user.email : p.email,
        phone: p.user && typeof p.user === 'object' ? p.user.phone_number : p.phone,
        user: p.user && typeof p.user === 'object' ? p.user.id : p.user,
        children: Array.isArray(p.children)
          ? p.children.map(child => {
              if (child && typeof child === 'object') {
                if (child.user && typeof child.user === 'object') {
                  return `${child.user.first_name} ${child.user.last_name}`.trim() || child.user.username;
                }
                return child.name || '';
              }
              return child || '';
            }).filter(Boolean)
          : []
      }));
    } catch (e) {
      return localMockState.parents;
    }
  },

  // Attendance
  getAttendanceLogs: async (studentId) => {
    try {
      const res = await apiInstance.get(`/attendance/logs/${studentId ? `?student=${studentId}` : ''}`);
      return res.data;
    } catch (e) {
      return localMockState.attendance_logs.filter(a => !studentId || a.student === parseInt(studentId));
    }
  },

  // LMS Lessons & Assignments
  getLessons: async (courseId) => {
    try {
      const res = await apiInstance.get(`/lms/lessons/?course=${courseId}`);
      return res.data;
    } catch (e) {
      return localMockState.lessons.filter(l => !courseId || l.course === parseInt(courseId));
    }
  },

  createLesson: async (lessonData) => {
    try {
      const res = await apiInstance.post('/lms/lessons/', lessonData);
      return res.data;
    } catch (e) {
      const newLesson = {
        id: localMockState.lessons.length + 1,
        course: parseInt(lessonData.course),
        title: lessonData.title,
        content_body: lessonData.content_body,
        video_url: lessonData.video_url,
        zoom_link: lessonData.zoom_link,
        scheduled_time: lessonData.scheduled_time || new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
      localMockState.lessons.push(newLesson);
      return newLesson;
    }
  },

  getAssignments: async (lessonId) => {
    try {
      const res = await apiInstance.get(`/lms/assignments/?lesson=${lessonId}`);
      return res.data;
    } catch (e) {
      return localMockState.assignments.filter(a => !lessonId || a.lesson === parseInt(lessonId));
    }
  },

  createAssignment: async (assignmentData) => {
    try {
      const res = await apiInstance.post('/lms/assignments/', assignmentData);
      return res.data;
    } catch (e) {
      const newAssignment = {
        id: localMockState.assignments.length + 1,
        lesson: parseInt(assignmentData.lesson),
        title: assignmentData.title,
        instructions: assignmentData.instructions,
        due_date: assignmentData.due_date,
        created_at: new Date().toISOString(),
      };
      localMockState.assignments.push(newAssignment);
      return newAssignment;
    }
  },

  getSubmissions: async (assignmentId) => {
    try {
      const res = await apiInstance.get(`/lms/submissions/?assignment=${assignmentId}`);
      return res.data;
    } catch (e) {
      return localMockState.submissions.filter(s => !assignmentId || s.assignment === parseInt(assignmentId));
    }
  },

  submitAssignment: async (submissionData) => {
    try {
      const formData = new FormData();
      formData.append('assignment', submissionData.assignment);
      formData.append('student', submissionData.student);
      if (submissionData.file) formData.append('file_attachment', submissionData.file);
      
      const res = await apiInstance.post('/lms/submissions/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    } catch (e) {
      const newSub = {
        id: localMockState.submissions.length + 1,
        assignment: parseInt(submissionData.assignment),
        student: submissionData.student || 3,
        submitted_at: new Date().toISOString(),
        file_attachment: submissionData.fileName || 'file_submission.pdf',
        grade: null,
        teacher_feedback: null,
      };
      // Overwrite if exists, otherwise push
      const idx = localMockState.submissions.findIndex(s => s.assignment === newSub.assignment && s.student === newSub.student);
      if (idx >= 0) {
        localMockState.submissions[idx] = newSub;
      } else {
        localMockState.submissions.push(newSub);
      }
      return newSub;
    }
  },

  gradeSubmission: async (id, grade, feedback) => {
    try {
      const res = await apiInstance.patch(`/lms/submissions/${id}/`, { grade, teacher_feedback: feedback });
      return res.data;
    } catch (e) {
      const sub = localMockState.submissions.find(s => s.id === parseInt(id));
      if (sub) {
        sub.grade = grade;
        sub.teacher_feedback = feedback;
        return sub;
      }
      throw new Error('Submission not found');
    }
  },

  // Islamic Studies Track
  getIslamicProfile: async (studentId) => {
    try {
      const res = await apiInstance.get(`/islamic-studies/profiles/?student=${studentId}`);
      return res.data[0];
    } catch (e) {
      return localMockState.islamic_profile;
    }
  },

  updateIslamicProfile: async (id, profileData) => {
    try {
      const res = await apiInstance.patch(`/islamic-studies/profiles/${id}/`, profileData);
      return res.data;
    } catch (e) {
      localMockState.islamic_profile = { ...localMockState.islamic_profile, ...profileData };
      return localMockState.islamic_profile;
    }
  },

  getDailyProgressLogs: async (profileId) => {
    try {
      const res = await apiInstance.get(`/islamic-studies/logs/?profile=${profileId}`);
      return res.data;
    } catch (e) {
      return localMockState.islamic_logs;
    }
  },

  addDailyProgressLog: async (logData) => {
    try {
      const res = await apiInstance.post('/islamic-studies/logs/', logData);
      return res.data;
    } catch (e) {
      const newLog = {
        id: localMockState.islamic_logs.length + 1,
        date: logData.date || new Date().toISOString().split('T')[0],
        type: logData.type,
        surah_name: logData.surah_name,
        from_ayat: parseInt(logData.from_ayat),
        to_ayat: parseInt(logData.to_ayat),
        evaluation_grade: logData.evaluation_grade,
        tarbiyah_notes: logData.tarbiyah_notes
      };
      localMockState.islamic_logs.unshift(newLog); // Put latest at top
      
      // Side effect: update current surah/ayat
      localMockState.islamic_profile.current_surah = logData.surah_name;
      localMockState.islamic_profile.current_ayat = parseInt(logData.to_ayat);
      
      return newLog;
    }
  },

  // Future Skills Future
  getSkillProgress: async (studentId) => {
    try {
      const res = await apiInstance.get(`/skills-future/progress/?student=${studentId}`);
      return res.data;
    } catch (e) {
      return localMockState.skill_progress.map(sp => ({
        ...sp,
        track_details: localMockState.skill_tracks.find(t => t.id === sp.track)
      }));
    }
  },

  getProjects: async (studentId) => {
    try {
      const res = await apiInstance.get(`/skills-future/projects/?student=${studentId}`);
      return res.data;
    } catch (e) {
      return localMockState.projects.map(p => ({
        ...p,
        track_details: localMockState.skill_tracks.find(t => t.id === p.track)
      }));
    }
  },

  submitProject: async (projectData) => {
    try {
      const res = await apiInstance.post('/skills-future/projects/', projectData);
      return res.data;
    } catch (e) {
      const newProj = {
        id: localMockState.projects.length + 1,
        student: projectData.student || 3,
        track: parseInt(projectData.track),
        title: projectData.title,
        project_url: projectData.project_url,
        submitted_at: new Date().toISOString(),
        grade: null,
        teacher_review: null
      };
      localMockState.projects.unshift(newProj);
      
      // Update student progress percent
      const prog = localMockState.skill_progress.find(sp => sp.track === newProj.track);
      if (prog) {
        prog.completed_projects_count += 1;
        prog.progress_percent = Math.min(100, prog.progress_percent + 15);
      } else {
        localMockState.skill_progress.push({
          id: localMockState.skill_progress.length + 1,
          student: 3,
          track: newProj.track,
          progress_percent: 15,
          completed_projects_count: 1,
          last_active: new Date().toISOString()
        });
      }
      return newProj;
    }
  },

  reviewProject: async (id, grade, reviewText) => {
    try {
      const res = await apiInstance.patch(`/skills-future/projects/${id}/`, { grade, teacher_review: reviewText });
      return res.data;
    } catch (e) {
      const proj = localMockState.projects.find(p => p.id === parseInt(id));
      if (proj) {
        proj.grade = grade;
        proj.teacher_review = reviewText;
        return proj;
      }
      throw new Error('Project not found');
    }
  },

  // Smart Proctoring Exams
  getExams: async () => {
    try {
      const res = await apiInstance.get('/exams/exams/');
      return res.data;
    } catch (e) {
      return localMockState.exams;
    }
  },

  submitExamAttempt: async (attemptData) => {
    try {
      const res = await apiInstance.post('/exams/attempts/', attemptData);
      return res.data;
    } catch (e) {
      const newAttempt = {
        id: localMockState.exam_attempts.length + 1,
        student: 3,
        exam: parseInt(attemptData.exam),
        score: attemptData.score,
        started_at: attemptData.started_at || new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        submitted_at: new Date().toISOString()
      };
      localMockState.exam_attempts.push(newAttempt);
      return newAttempt;
    }
  },

  logProctoringViolation: async (violationData) => {
    try {
      const res = await apiInstance.post('/exams/violations/', violationData);
      return res.data;
    } catch (e) {
      const newV = {
        id: localMockState.violations.length + 1,
        attempt: parseInt(violationData.attempt) || 1,
        timestamp: new Date().toISOString(),
        violation_type: violationData.violation_type,
        confidence_score: parseFloat(violationData.confidence_score)
      };
      localMockState.violations.push(newV);
      return newV;
    }
  },

  getProctoringViolations: async (attemptId) => {
    try {
      const res = await apiInstance.get(`/exams/violations/?attempt=${attemptId}`);
      return res.data;
    } catch (e) {
      return localMockState.violations.filter(v => v.attempt === parseInt(attemptId));
    }
  },

  // Financial & Billing (Accounts)
  getInvoices: async (studentId) => {
    try {
      const res = await apiInstance.get(`/accounts/invoices/?student=${studentId}`);
      return res.data;
    } catch (e) {
      return localMockState.invoices.filter(i => !studentId || i.student === parseInt(studentId));
    }
  },

  payInvoice: async (id, paymentMethod) => {
    try {
      const res = await apiInstance.patch(`/accounts/invoices/${id}/`, { status: 'PAID', payment_method: paymentMethod });
      return res.data;
    } catch (e) {
      const inv = localMockState.invoices.find(i => i.id === parseInt(id));
      if (inv) {
        inv.status = 'PAID';
        inv.payment_method = paymentMethod;
        return inv;
      }
      throw new Error('Invoice not found');
    }
  },

  getSalaries: async () => {
    try {
      const res = await apiInstance.get('/accounts/salaries/');
      return res.data;
    } catch (e) {
      return localMockState.salaries;
    }
  },

  getFeeStructures: async () => {
    try {
      const res = await apiInstance.get('/accounts/fees/');
      return res.data;
    } catch (e) {
      return localMockState.fee_structures;
    }
  },

  // Student assessments (Report Cards)
  getAssessmentResults: async (studentId) => {
    try {
      const res = await apiInstance.get(`/assessments/results/?student=${studentId}`);
      return res.data;
    } catch (e) {
      return localMockState.assessment_results;
    }
  },

  // Direct Message & Chat
  getChatMessages: async (contactId) => {
    try {
      const res = await apiInstance.get(`/chat/messages/thread/${contactId}/`);
      return res.data;
    } catch (e) {
      // Find current user role to match ID
      const token = localStorage.getItem('access_token');
      let myId = 1; // default admin
      if (token) {
        if (token.includes('STUDENT')) myId = 3;
        else if (token.includes('TEACHER')) myId = 2;
        else if (token.includes('PARENT')) myId = 4;
      }
      return localMockState.chat_messages.filter(
        msg => (msg.sender === myId && msg.recipient === parseInt(contactId)) ||
               (msg.sender === parseInt(contactId) && msg.recipient === myId)
      );
    }
  },

  sendChatMessage: async (contactId, messageText) => {
    try {
      const res = await apiInstance.post('/chat/messages/', {
        recipient: parseInt(contactId),
        message: messageText
      });
      return res.data;
    } catch (e) {
      const token = localStorage.getItem('access_token');
      let myId = 1;
      let myUsername = 'admin';
      if (token) {
        if (token.includes('STUDENT')) { myId = 3; myUsername = 'student_zayd'; }
        else if (token.includes('TEACHER')) { myId = 2; myUsername = 'teacher_ahmed'; }
        else if (token.includes('PARENT')) { myId = 4; myUsername = 'parent_ahmed'; }
      }
      const newMsg = {
        id: localMockState.chat_messages.length + 1,
        sender: myId,
        sender_username: myUsername,
        recipient: parseInt(contactId),
        recipient_username: contactId === '2' ? 'teacher_ahmed' : (contactId === '3' ? 'student_zayd' : 'admin'),
        message: messageText,
        timestamp: new Date().toISOString(),
        is_read: false
      };
      localMockState.chat_messages.push(newMsg);
      return newMsg;
    }
  },

  // Gemini API integration
  askAI: async (prompt, userRole) => {
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
  }
};
