'use client';
import CourseContainer from '@/components/CourseContainer';
import NavBar from './navBar';
import React, { useState } from 'react';
import ToDoListContainer from './toDoList';
import UpComingTaskContainer from './upComingTask';




const Dashboard = () => {
 
  return (
  <div className="h-full w-full bg-[#F4F7FE] p-6">
    <NavBar/>
    <div className="flex flex-wrap p-6">
      <div className="grid sm:w-100 md:grid-cols-1 lg:grid-cols-2 gap-4 jus">
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
      <div className="grid sm:w-100 md:grid-cols-1 lg:grid-cols-1 gap-4">
        <ToDoListContainer>
          <h1>TO DO LIST</h1>
        </ToDoListContainer>
        
        <UpComingTaskContainer>
          <h1>UPCOMING TASKS</h1>
        </UpComingTaskContainer>
      </div>
    </div>
</div>


  );
  
}

export default Dashboard;
