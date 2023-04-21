import { getAllPostIds, getPostData } from '@/lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import homestyles from '../../styles/Home.module.css'

export default function post({postData}:{
  postData : {
    title:string
    date:string
    contentHtml:string
  }
}) {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={homestyles.heading2Xl}>{postData.title}</h1>
        <div className={homestyles.headingXl}>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{__html:postData.contentHtml}}/>
      </article>
    </div>
  )
}

export const getStaticPaths:GetStaticPaths = async() => {
  const paths = getAllPostIds();
  console.log('paths',paths)
  return {

    paths,
    fallback:true
    //false면 getStaticPaths로 리턴되지않는것은 모두 404 페이지가 뜬다 
    //true면 404로 뜨지않고 , fallback 페이지가 뜨게 된다.
      
  }
}

export const getStaticProps:GetStaticProps = async ({params}) =>{
  console.log('params',params); //{id : 'pre-rendering} {id : 'ssg-ssr}
  const postData = await getPostData(params?.id as string)
  return{
    props:{
      postData
    }
  }
}