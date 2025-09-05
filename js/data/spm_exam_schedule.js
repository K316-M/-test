/**
 * SPM考试时间表数据
 * 从 https://www.bumigemilang.com/jadual-waktu-peperiksaan-spm-2/ 抓取
 * 包含正式考试和预考题考试时间表
 */

const spmExamSchedule = [
// 预考题考试时间表
{
  year: "2023",
  exam_period: {
    start: "2023-09-01",
    end: "2023-09-15"
  },
  written_exams: [
    {
      date: "2023-09-01",
      exams: [
        {
          subject: "数学预考题模拟考试",
          time: "8:00 - 10:00",
          subject_type: "mock_exam",
          exam_type: "written",
          duration: "2小时"
        },
        {
          subject: "附加数学预考题模拟考试",
          time: "11:00 - 13:00",
          subject_type: "mock_exam",
          exam_type: "written",
          duration: "2小时"
        }
      ]
    },
    {
      date: "2023-09-02",
      exams: [
        {
          subject: "英文预考题模拟考试 1",
          time: "8:00 - 9:30",
          subject_type: "mock_exam",
          exam_type: "written",
          duration: "1小时30分钟"
        },
        {
          subject: "英文预考题模拟考试 2",
          time: "10:30 - 12:00",
          subject_type: "mock_exam",
          exam_type: "written",
          duration: "1小时30分钟"
        }
      ]
    },
    {
      date: "2023-09-03",
      exams: [
        {
          subject: "物理预考题模拟考试",
          time: "8:00 - 10:00",
          subject_type: "mock_exam",
          exam_type: "written",
          duration: "2小时"
        },
        {
          subject: "化学预考题模拟考试",
          time: "11:00 - 13:00",
          subject_type: "mock_exam",
          exam_type: "written",
          duration: "2小时"
        }
      ]
    }
  ]
},
{
  year: "2025",
  exam_period: {
    start: "2025-11-25",
    end: "2025-12-23"
  },
  oral_exams: [
    {
      subject: "Ujian Bertutur Bahasa Melayu",
      period: "2025-11-03 至 2025-11-06",
      subject_type: "language",
      exam_type: "oral"
    },
    {
      subject: "Ujian Bertutur Bahasa Inggeris",
      period: "2025-11-10 至 2025-11-13",
      subject_type: "language",
      exam_type: "listening"
    }
  ],
  practical_exams: [
    {
      subject: "Fizik 3",
      date: "2025-11-17",
      subject_type: "science",
      exam_type: "practical"
    },
    {
      subject: "Kimia 3",
      date: "2025-11-18",
      subject_type: "science",
      exam_type: "practical"
    },
    {
      subject: "Biologi 3 dan Sains Tambahan 3",
      date: "2025-11-19",
      subject_type: "science",
      exam_type: "practical"
    }
  ],
  listening_exams: [
    {
      subject: "Ujian Mendengar Bahasa Melayu dan Bahasa Inggeris",
      date: "2025-11-20",
      subject_type: "language",
      exam_type: "written"
    }
  ],
  written_exams: [
    {
      date: "2025-11-25",
      exams: [
        {
          subject: "Bahasa Melayu 1",
          time: "8:00 - 10:00",
          subject_type: "language",
          exam_type: "written"
        },
        {
          subject: "Bahasa Melayu 2",
          time: "11:00 - 13:00",
          subject_type: "language",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-11-26",
      exams: [
        {
          subject: "English 1",
          time: "8:00 - 9:30",
          subject_type: "language",
          exam_type: "written"
        },
        {
          subject: "English 2",
          time: "10:30 - 12:00",
          subject_type: "language",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-11-27",
      exams: [
        {
          subject: "Sejarah 1",
          time: "8:00 - 10:00",
          subject_type: "humanities",
      exam_type: "written"
        },
        {
          subject: "Sejarah 2",
          time: "11:00 - 13:00",
          subject_type: "humanities",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-01",
      exams: [
        {
          subject: "Mathematics 1",
          time: "8:00 - 10:00",
          subject_type: "science",
          exam_type: "written"
        },
        {
          subject: "Mathematics 2",
          time: "11:00 - 13:00",
          subject_type: "science",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-02",
      exams: [
        {
          subject: "Additional Mathematics 1",
          time: "8:00 - 10:00",
          subject_type: "science",
          exam_type: "written"
        },
        {
          subject: "Additional Mathematics 2",
          time: "11:00 - 13:00",
          subject_type: "science",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-03",
      exams: [
        {
          subject: "Physics 1",
          time: "8:00 - 10:00",
          subject_type: "science",
          exam_type: "written"
        },
        {
          subject: "Physics 2",
          time: "11:00 - 13:00",
          subject_type: "science",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-04",
      exams: [
        {
          subject: "Chemistry 1",
          time: "8:00 - 10:00",
          subject_type: "science",
          exam_type: "written"
        },
        {
          subject: "Chemistry 2",
          time: "11:00 - 13:00",
          subject_type: "science",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-08",
      exams: [
        {
          subject: "Biology 1",
          time: "8:00 - 10:00",
          subject_type: "science",
          exam_type: "written"
        },
        {
          subject: "Biology 2",
          time: "11:00 - 13:00",
          subject_type: "science",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-09",
      exams: [
        {
          subject: "Ekonomi 1",
          time: "8:00 - 10:00",
          subject_type: "commerce",
          exam_type: "written"
        },
        {
          subject: "Ekonomi 2",
          time: "11:00 - 13:00",
          subject_type: "commerce",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-10",
      exams: [
        {
          subject: "Prinsip Perakaunan 1",
          time: "8:00 - 10:00",
          subject_type: "commerce",
          exam_type: "written"
        },
        {
          subject: "Prinsip Perakaunan 2",
          time: "11:00 - 13:00",
          subject_type: "commerce",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-11",
      exams: [
        {
          subject: "Perniagaan 1",
          time: "8:00 - 10:00",
          subject_type: "commerce",
          exam_type: "written"
        },
        {
          subject: "Perniagaan 2",
          time: "11:00 - 13:00",
          subject_type: "commerce",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-15",
      exams: [
        {
          subject: "Pendidikan Islam 1",
          time: "8:00 - 10:00",
          subject_type: "humanities",
          exam_type: "written"
        },
        {
          subject: "Pendidikan Islam 2",
          time: "11:00 - 13:00",
          subject_type: "humanities",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-16",
      exams: [
        {
          subject: "Pendidikan Moral",
          time: "8:00 - 10:00",
          subject_type: "humanities",
          exam_type: "written"
        },
        {
          subject: "Pendidikan Seni Visual",
          time: "11:00 - 13:00",
          subject_type: "arts",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-17",
      exams: [
        {
          subject: "Bahasa Cina 1",
          time: "8:00 - 10:00",
          subject_type: "language",
          exam_type: "written"
        },
        {
          subject: "Bahasa Cina 2",
          time: "11:00 - 13:00",
          subject_type: "language",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-18",
      exams: [
        {
          subject: "Bahasa Tamil 1",
          time: "8:00 - 10:00",
          subject_type: "language",
          exam_type: "written"
        },
        {
          subject: "Bahasa Tamil 2",
          time: "11:00 - 13:00",
          subject_type: "language",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-22",
      exams: [
        {
          subject: "Sains 1",
          time: "8:00 - 10:00",
          subject_type: "science",
          exam_type: "written"
        },
        {
          subject: "Sains 2",
          time: "11:00 - 13:00",
          subject_type: "science",
          exam_type: "written"
        }
      ]
    },
    {
      date: "2025-12-23",
      exams: [
        {
          subject: "Bahasa Arab",
          time: "8:00 - 10:30",
          subject_type: "language",
          exam_type: "written"
        },
        {
          subject: "Bahasa Iban",
          time: "11:30 - 14:00",
          subject_type: "language",
          exam_type: "written"
        }
      ]
    }
  ]
}
];

// 导出数据供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { spmExamSchedule };
}