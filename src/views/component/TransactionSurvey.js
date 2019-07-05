import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import '../../styles/surveycard.css'
import { SelectedReason } from '../../redux/actions/notification/notification';
import { authRoutes } from '../../utils/Common';
import { set } from 'mongoose';


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
  let [question5, setQuestion5 ] = useState()
  let [question5check, setQuestion5check ] = useState('')
  let [promotionField, setPromotionField ] = useState()
  let [directMessage, setDirectMessage ] = useState()
  let [loader, setLoader] = useState(false)
  let [successMsg, setSuccessMsg] = useState('')
  let [show, setShow] = useState(false)

  let showQuestions = (Case) =>{
    switch(Case) {
      case 'case1':
        setQuestion2(true)
        setQuestion5(true)
        break;
      case 'case2':
        setQuestion2(false)
        break;
      case 'case5':
      setQuestion3(false)
        setQuestion2(false)
        setQuestion5(false)
        setPromotionField(false)
        setDirectMessage(false)
        setQuestion4(false)
        break;
      case 'case6':
      setQuestion5(true)
        setQuestion3(true)
        break;
      case 'case7':
        setQuestion5(false)
        setQuestion3(false)
        setQuestion4(false)
        setPromotionField(false)
        setDirectMessage(false)
        break;
      case 'case8':
        setPromotionField(true)
        setQuestion4(false)
        break;
      case 'case9':
        setPromotionField(false)
        setDirectMessage(false)
        setQuestion4(true)
        break;
      case 'case10':
        setDirectMessage(true)
        break;
      case 'case11':
        setDirectMessage(false)
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
      case 5:
        setQuestion5check(val)
        break;
      case 4:
        setQuestion4check(val)
        break;
    }
  }

   let handleradioleChange = (index,Case, e) => {
    let val = e.target.value
    showQuestions(Case)
    optionCheck(index, val)
  }

  useEffect(() => {
    authRoutes(props)
    let user = JSON.parse(localStorage.getItem('user'))
    const { Type = ''} = user || {}
    setLoader(true)
    axios.get(`http://18.219.191.74:7777/gettransactionsurvey`)
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
    if(question5check == 'YES'){
      props.dispatch(SelectedReason('transactionsurvey'))
      props.history.push('/contact/3')
    } 
    setShow(true)
  }

  

  return (
    <div className="container">
      <div className="row">
        <div className='survey-card'>
          <div class="surveycard">

            <div className='card-header '>
              <p className="card-header-title card-heading "> <i class="fas fa-cog"></i>Transaction Survey</p>
            </div>
              {
                loader ?  <div class='survey-loading'>
                            <img src= {require('../../images/loader.gif')}/>
                          </div> : ''
              }
            <div className="checkboxes">
                    <p className='survey-question'>{survey.length?survey[0].Question:''}</p>
                    <div className='checkbox-data'>
                    <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value='YES' checked={question1check =='YES'}  onChange={(event) =>handleradioleChange(1, 'case1', event)}/> YES
                    </label>

                    <label class="checkbox-inline">
                    <input type="checkbox" value='NO'  checked={question1check == 'NO'}  onChange={(event) =>handleradioleChange(1, 'case5', event)}/>NO
                    </label>
                </div>
              </div>

            {question2 ?
              <div className="checkboxes">
                <p className='survey-question'>{survey.length?survey[1].Question:''}</p>
                <div className='checkbox-data'>
                  <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value="YES" checked={question2check =='YES'}  onChange={(event) =>handleradioleChange(2, 'case6', event)}/> YES
                     </label>

                  <label class="checkbox-inline">
                    <input type="checkbox" checked={question2check =='NO'} value="NO" onChange={(event) =>handleradioleChange(2, 'case7', event)} />NO
                     </label>
                </div>
              </div>
              : ''}

            {question3 ?
              <div className="checkboxes survey-complaint">
                <p className='survey-question'>{survey.length ? survey[2].Question : ''}</p>
                <div className='checkbox-data'>
                  <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value="YES" checked={question3check == 'YES'} onChange={(event) => handleradioleChange(3, 'case8', event)} /> YES
                     </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" checked={question3check == 'NO'} value="NO" onChange={(event) => handleradioleChange(3, 'case9', event)} />NO
                     </label>
                </div>
              </div>
              : ''}

            {promotionField?
              <div className="checkboxes survey-complaint">
                <div class="field address">
                  <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="Name" />
                    <span class="icon is-small is-left">
                      <i class="fas fa-address-card"></i>
                    </span>
                  </p>
                </div>

                <div class="field address">
                  <div class="control">
                    <textarea class="textarea" placeholder="Input any complimentary comment(s) here"></textarea>
                  </div>
                  <p className ='reminder-msg'><strong>IMPORTANT REMINDER:</strong>By inputting any comment(s) in this section, you are agreeing to allow said comments
            to be used for promotional purposes publicly. That said, if you would like your comment(s) to stay private please change the 
            previous answer to NO and provide direct feedback in the question below.</p>
                </div>
              </div>
            :''}
            {question5 == false?
             <div className="checkboxes survey-complaint">
             <p className='survey-question'>{survey.length?survey[4].Question:''}</p>
                     <div className='checkbox-data'>
                     <label class="checkbox-inline lable-text ">
                     <input type="checkbox" value='YES' checked={question5check =='YES'}  onChange={(event) =>handleradioleChange(5, 'case3', event)}/> YES
                     </label>
 
                     <label class="checkbox-inline">
                     <input type="checkbox" value='NO'  checked={question5check == 'NO'}  onChange={(event) =>handleradioleChange(5, 'case4', event)}/>NO
                     </label>
                 </div>
             </div>
            :''}
           
            {question4 ?
              <div>
                <div className="checkboxes">
                  <p className='survey-question'>{survey.length?survey[3].Question:''}</p>
                  <div className='checkbox-data'>
                    <label class="checkbox-inline lable-text ">
                      <input type="checkbox" value="YES" checked={question4check =='YES'} onChange={(event) =>handleradioleChange(4, 'case10', event)} /> YES
                    </label>

                    <label class="checkbox-inline">
                      <input type="checkbox" value="NO" checked={question4check == 'NO'}   onChange={(event) =>handleradioleChange(4, 'case11', event)}/>NO
                    </label>
                  </div>
                </div>


              {directMessage?
                <div className="checkboxes survey-complaint">
                <div class="field address">
                <div class="control">
                  <textarea class="textarea" placeholder="Provide any feedback here"></textarea>
                </div>
                <p className='reminder-msg'><strong>IMPORTANT REMINDER:</strong>Any feedback provided in the section above will be considered private.
                Faliure to adhere to this rule will results in status suspension or permanent accoun delation  </p>
                </div>
              </div>:''
              }
                

              </div> : ''

            }

            

            <div className='survey-btn'>
              <a class="button is-primary" onClick = {onSubmit}><span className='btn-angle-down'><i class="fas fa-angle-down"></i></span>SUBMIT</a>
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
 