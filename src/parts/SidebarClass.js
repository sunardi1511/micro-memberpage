import React from 'react'

import { ReactComponent as ArrowBack } from '../assets/images/arrow_back.svg';

import { Link, useMatch, useMatches, useNavigate, useParams } from 'react-router-dom';

const SidebarClass = ({ data, defaultUri }) => {
  const params = useParams()
  const navigate = useNavigate()


  const getNavLinkClass = (path) => {
    return params.url === path || defaultUri === path
      ? "text-teal-500"
      : "text-indigo-500"
  }


  const list = [];
  data.chapters.forEach((chapter, index) => {
    list.push(
      <li key={`${chapter.course_id}-${index}`}>
        <span className="nav-header relative block py-3 px-5 bg-indigo-800 text-white text-left">
          {chapter?.name ?? "Chapter name"}
        </span>
      </li>
    );
    if (chapter?.lessons?.length > 0)
      chapter.lessons.forEach((lesson, index2) => {
        console.log('lesson', lesson)
        list.push(
          <li key={`${chapter.course_id}-${lesson.id}-${index2}`}>
            <Link
              className={[
                "relative flex items-center py-3 px-5 transition-all duration-200 w-full text-left truncate ...",
                getNavLinkClass(
                  `/courses/${data.id}/${chapter.id}/${lesson.video}`
                ),
              ].join(" ")}
              to={`/courses/${data.id}/${chapter.id}/${lesson.video}`}
            >
              {lesson?.name ?? "Lesson name"}
            </Link>
          </li>
        );
      });
  });




  return (
    <aside className='bg-indigo-900 max-h-screen h-screen overflow-y-auto' style={{ width: 280 }}>
      <div className='max-h-screen h-screen fixed bg-indigo-900 flex flex-col content-between'
        style={{ width: 280 }}>
        <ul className='main-menu mt-12'>
          <li>
            <Link className='relative flex items-center py-3 px-5 w-full text-left text-white mb-12'
              to="/">
              <ArrowBack />
              Back To Home
            </Link>
          </li>
          {list}
        </ul>
      </div>
    </aside>
  )
}

export default SidebarClass