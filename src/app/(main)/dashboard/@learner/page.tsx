import { getServerSession } from 'next-auth';
import CourseContainer from './courseContainer';
import MyCourses from './myCourses';
import ToDoListContainer from './toDoList';
import UpComingTaskContainer from './upComingTask'

const Dashboard = async () => {
  return (
    <div className="flex flex-col px-6 py-4 h-full gap-6">
      <div className='flex flex-col xl:flex-row w-full gap-6'>
        <div className='flex flex-col w-full bg-white p-4 rounded-lg border border-gray border-opacity-20 h-[552px]'>
          <h1 className='font-bold text-xl'>Recently visited</h1>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-4 gap-6 mt-4 h-full overflow-auto'>
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
        </div>

        <div className='flex flex-col gap-6 w-full max-w-[432px]'>
          <div className='bg-white flex flex-col gap-2 p-4 items-center justify-center rounded-lg border border-gray border-opacity-20 h-[128px]'>
            <span className='font-bold text-3xl'>3</span>
            <span className='font-medium text-2xl'>Daily Quests Available</span>
          </div>
          <ToDoListContainer />
        </div>
      </div>

      <div className='flex flex-col-reverse xl:flex-row w-full gap-6'>
        <div className='w-full'>
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
