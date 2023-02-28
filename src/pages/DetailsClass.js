import React, { useEffect } from 'react';
import Youtube from 'react-youtube';
import { useDispatch, useSelector } from "react-redux";

import { statusCourses, watchCourse, messageCourses, watchCourses } from "../store/actions/courses";
import SidebarClass from "../parts/SidebarClass";
import courses from "../constants/api/courses";
import Loading from "../parts/Loading";
import Centered from "../parts/Centered";
import { useNavigate, useParams } from 'react-router-dom';

const DetailsClass = () => {

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const COURSES = useSelector(state => state.courses)

  useEffect(() => {
    window.scroll(0, 0)

    dispatch(statusCourses("loading"))
    courses.details(params.class).then(res => {
      if (res.chapters.length === 0)
        throw new Error("Class might be not ready yet")
      else dispatch(watchCourses(res))
    })
      .catch(err => {
        dispatch(messageCourses(err?.response?.data?.message ?? "error"))
      })
  }, [params.class, dispatch])

  if (COURSES.status === "loading") return <Loading />
  if (COURSES.status === "error") return <Centered>{COURSES?.message ?? "error here"}</Centered>

  let currentChapter, currentLessons
  if (
    COURSES.status === "ok" &&
    COURSES?.data?.[params.class]?.chapters
  ) {
    currentChapter = COURSES?.data?.[params.class]?.chapters?.find(
      (chapters) => +chapters.id === +params.chapters
    ) ?? COURSES?.data?.[params.class]?.chapters[0];

    currentLessons = currentChapter?.lessons?.find(
      (lessons) => lessons.video === params.uid)
      ?? currentChapter?.lessons?.[0]
  }

  const nextVideo = () => { }

  return (
    <div className='flex'>
      {COURSES?.data?.[params.class]?.chapters?.length > 0 && (
        <>
          <SidebarClass data={COURSES?.data[params.class]}
            defaultUri={`/courses/${params.class}/${currentChapter.id}/$${currentLessons.video}`} />
          <main className='flex-1'>
            <div className='px-16'>
              <section className='flex flex-col mt-8'>
                <h1 className='text-4xl text-gray-900 font-medium'>
                  {currentLessons?.name ?? "Lesson Name"}
                </h1>
                <p className='text-lg text-gray-600'>
                  Materi bagian dari {currentChapter?.name ?? "Chapter Name"}
                </p>
              </section>
              <section className='flex-col flex mt-8'>
                <div className='flex justify-start items-center -mx-4'>
                  <div className='w-full px4'>
                    <div className='relative'>
                      <div className='video-wrapper'>
                        {
                          currentLessons?.video &&
                          <Youtube
                            videoId={currentLessons?.video}
                            id={currentLessons?.video}
                            opts={{
                              playerVars: {
                                autoplay: 1,
                                controls: 1,
                                showinfo: 0,
                                rel: 0
                              },

                            }}
                            onEnd={nextVideo}
                          />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </>
      )}
    </div>
  )
}

export default DetailsClass