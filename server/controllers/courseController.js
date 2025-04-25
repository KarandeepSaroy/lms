import Course from "../models/Course.js";
import User from "../models/User.js";

// Get All Courses
export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select(['-courseContent', '-enrolledStudents']) // exclude large data
      .populate({ path: 'educator', select: 'name imageUrl' }) // fetch only relevant educator fields

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Course by Id
export const getCourseId = async (req, res) => {
  const { id } = req.params;

  try {
    const courseData = await Course.findById(id)
      .populate({ path: 'educator', select: 'name imageUrl email' }); // choose needed fields

    if (!courseData) {
      return res.json({ success: false, message: "Course not found" });
    }

    // Remove non-preview lecture URLs
    courseData.courseContent.forEach(chapter => {
      chapter.chapterContent.forEach(lecture => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });

    res.json({ success: true, courseData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// import Course from "../models/Course.js";
// import User from "../models/User.js";

// Get All Courses

// export const getAllCourse = async (req, res)=>{
//     try {
//         const courses = await Course.find({isPublished: true}).select(['-courseContent', '-enrolledStudents']).populate({path: 'educator'})
        
//         res.json({ success: true, courses })

//     } catch (error) {
//         res.json({ success: false, message: error.message})

//     }
// }

// // Get Course by Id

// export const getCourseId = async (req, res)=>{
//     const { id } = req.params

//     try {
//         const courseData = await Course.findById(id).populate({ path: 'educator'})

//         // Remove lectureUrl if isPrevirwFree is false
//         courseData.courseContent.forEach(chapter => {
//             chapter.chapterContent.forEach(lecture => {
//                 if(!lecture.isPreviewFree) {
//                     lecture.lectureUrl = "";
//                 }
//             })
//         })

//         res.json({ success: true, courseData })

//     } catch ( error ) {
//         res.json({ success: false, message: error.message })

//     }
// }