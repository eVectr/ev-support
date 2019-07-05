import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import '../../styles/surveycard.css'
import { SelectedReason } from '../../redux/actions/notification/notification';
import { authRoutes } from '../../utils/Common';

const SurveyCard = (props) => {

  const [survey, setSurvey] = useState([])
  let [selectedOption, setSelectedOption ] = useState('')
  let [question1check, setQuestion1check ] = useState('')
  let [question2, setQuestion2 ] = useState(null)
  let [question2check, setQuestion2check ] = useState('')
  let [question3, setQuestion3 ] = useState()
  let [question3check, setQuestion3check ] = useState('')
  let [question4, setQuestion4 ] = useState()
  let [question4check, setQuestion4check ] = useState('')
  let [loader, setLoader] = useState(false)
  let [successMsg, setSuccessMsg] = useState('')
  let [show, setShow] = useState(false)

  let showQuestions = (Case) =>{
    switch(Case) {
      case 'case1':
        setQuestion2(true)
        setQuestion3(false)
        break;
      case 'case2':
        setQuestion4(false)
        setQuestion2(false)
        setQuestion3(true)
        break;
      case 'case3':
        setQuestion4(false)
        break;
      case 'case8':
        setQuestion4(true)
        break;
    }
  }

  let optionCheck = (index, val) =>{
    switch(index) {
      case 1:
        setQuestion1check(val)
        break;
      case 2:
        setQuestion2check(val)
        break;
      case 3:
        setQuestion3check(val)
        break;
      case 4:
        setQuestion4check(val)
      
    }
  }

  let handleradioleChange = (index,Case, e) => {
    let val = e.target.value
    showQuestions(Case)
    optionCheck(index, val)
  }

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'))
        let { _id = '', Type = ''} = user || {}
    authRoutes(props)
    setLoader(true)
    axios.get(`http://18.219.191.74:7777/getclientsurvey`)
      .then(res => {
        let { data = [] } = res
        console.log("data ==>", data)
        setSuccessMsg('Your Message Successfully Saved')
        setSurvey(data)
        setLoader(false)
      })
      if(Type !== 'user'){
        props.history.push('/contact')
      }
  }, [])

  let onSubmit = () =>{
    if(question3check == 'YES' || question4check == 'YES'){
      props.dispatch(SelectedReason('clientsurvey'))
      props.history.push('/contact/3')
    }
    setShow(true)
  }
 
    return(
      <div className="container">
        <div className="row">
          <div className='survey-card'>
            <div class="surveycard">

              <div className='card-header '>
                <p className="card-header-title card-heading "> <i class="fas fa-cog"></i> Client Survey</p>
              </div> 
              {
                loader ?  <div className='survey-loading'>
                    <img src = {require('../../images/loader.gif')}/>
                </div> : ''
              }
             
              <div className="checkboxes">
                    <p className='survey-question'>{survey.length?survey[0].Question:''}</p>
                    <div className='checkbox-data'>
                    <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value='YES' checked={question1check =='YES'}  onChange={(event) =>handleradioleChange(1, 'case1', event)}/> YES
                    </label>

                    <label class="checkbox-inline">
                    <input type="checkbox" value='NO'  checked={question1check == 'NO'}  onChange={(event) =>handleradioleChange(1, 'case2', event)}/>NO
                    </label>
                </div>
              </div>
              

              {question2 ?
                <div className="checkboxes">
                  <p className='survey-question'>{survey.length?survey[1].Question:''}</p>
                  <div className='checkbox-data'>
                    <label class="checkbox-inline lable-text ">
                      <input type="checkbox" value='YES' checked={question2check == 'YES'} onChange={(event) =>handleradioleChange(2,'case3',event)} /> YES
                 </label>

                    <label class="checkbox-inline">
                      <input type="checkbox" value='NO' checked={question2check == 'NO'} onChange={(event) =>handleradioleChange(2,'case8',event)} />NO
                 </label>
                  </div>
                </div>:
                ''
              }
             

            {question3?
              <div className="checkboxes survey-complaint">
                <p className='survey-question'>{survey.length ? survey[2].Question : ''}</p>
                <div className='checkbox-data'>
                  <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value='YES' checked={question3check == 'YES'} onChange={(event) =>handleradioleChange(3,'case4', event)}  /> YES
                </label>

                  <label class="checkbox-inline">
                    <input type="checkbox" value='NO' checked={question3check == 'NO'} onChange={(event) =>handleradioleChange(3, 'case5', event)} />NO
               </label>
                </div>
              </div>:
              ''
              }

            {question4?
              <div className="checkboxes survey-complaint">
                <p className='survey-question'>{survey.length ? survey[3].Question : ''}</p>
                <div className='checkbox-data'>
                  <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value='YES' checked={question4check == 'YES'} onChange={(event) =>handleradioleChange(4,'case6', event)}  /> YES
                </label>

                  <label class="checkbox-inline">
                    <input type="checkbox" value='NO' checked={question4check == 'NO'} onChange={(event) =>handleradioleChange(4, 'case7', event)} />NO
               </label>
                </div>
              </div>:
              ''
              }

            <div className='survey-btn'>
              <a class="button is-primary" onClick = {onSubmit}><span className='btn-angle-down'><i class="fas fa-angle-down" ></i></span>SUBMIT</a>
            </div>
              {
                show ? <p className='send-success-msg'>{successMsg}</p> : ''
              } 
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(state => state)(SurveyCard )
