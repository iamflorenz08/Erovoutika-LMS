import { getServerSession } from 'next-auth';
import CourseContainer from './courseContainer';
import MyCourses from './myCourses';
import ToDoListContainer from './toDoList';
import UpComingTaskContainer from './upComingTask'

const Dashboard = async () => {
  return (
    <div className="flex flex-col px-6 pb-4 h-full gap-5">
      <div className='flex flex-col xl:flex-row w-full gap-5'>
        <div className='w-full grid 2xl:grid-cols-2 gap-5 h-fit'>
          <CourseContainer
            imageUrl={'https://pbs.twimg.com/profile_images/1163911054788833282/AcA2LnWL_400x400.jpg'}
            text={'Introduction to Laravel'}
            buttonText={'Start'}
          />

          <CourseContainer
            imageUrl={'https://pbs.twimg.com/profile_images/1163911054788833282/AcA2LnWL_400x400.jpg'}
            text={'Introduction to Laravel'}
            buttonText={'Start'}
          />

          <CourseContainer
            imageUrl={'https://pbs.twimg.com/profile_images/1163911054788833282/AcA2LnWL_400x400.jpg'}
            text={'Introduction to Laravel'}
            buttonText={'Start'}
          />

        </div>

        <div className='flex'>
          <ToDoListContainer />
        </div>
      </div>

      <div className='flex flex-col-reverse xl:flex-row w-full gap-5'>
        <div className='w-full grid 2xl:grid-cols-2 gap-5 h-fit'>
          <MyCourses />
          <MyCourses />
        </div>
        <div className='flex'>
          <UpComingTaskContainer />
        </div>
      </div>
    </div>
  );

}

export default Dashboard;
