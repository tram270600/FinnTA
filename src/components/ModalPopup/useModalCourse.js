import { useState } from 'react';

const useModalCourse = () => {
  const [isShowingCourse, setIsShowingCourse] = useState(false);

  function toggleCourse() {
    setIsShowingCourse(!isShowingCourse);
  }
 
  return {
    isShowingCourse,toggleCourse,

  }
};

export default useModalCourse;