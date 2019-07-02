import React, { Component, Fragment } from 'react'
import '../../styles/surveycard.css'

class SurveyCard extends Component {

  render(){
    return(
    
      <div className="container">
        <div className="row">
          <div className='survey-card'>
            <div class="card">

              <div className='card-header '>
                <p className="card-header-title card-heading "> <i class="fas fa-cog"></i> Client Survey</p>
              </div> 

              <div className="checkboxes">
                    <p className='survey-question'>Was Payment Properly Receveid?</p>
                    <div className='checkbox-data'>
                        <label class="checkbox-inline lable-text  ">
                            <input type="checkbox" value=""/> YES
                        </label>

                        <label class="checkbox-inline">
                        <input type="checkbox" value=""/>NO
                        </label>
                    </div>
              </div>

              <div className="checkboxes">
                
                    <p className='survey-question'>Was appropriate behavious exhibited?</p>
                    <div className='checkbox-data'>
                    <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value=""/> YES
                    </label>

                    <label class="checkbox-inline">
                    <input type="checkbox" value=""/>NO
                    </label>
                </div>
              </div>

              <div className="checkboxes survey-complaint">
                
                    <p className='survey-question'>If No, Would You like to file a Complaint?</p>
                    <div className='checkbox-data'>
                    <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value=""/> YES
                    </label>

                    <label class="checkbox-inline">
                    <input type="checkbox" value=""/>NO
                    </label>
                </div>
              </div>

              
              
              <div class="field address">
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="Name"/>
                  <span class="icon is-small is-left">
                    <i class="fas fa-address-card"></i>
                  </span>
                </p>
              </div>
              
              <div class="field address">
                <div class="control">
                  <textarea class="textarea" placeholder="Normal textarea"></textarea>
                </div>
              </div>
              


              <div className="checkboxes">
               
                    <p className='survey-question'>Would You like to provide direct feedback?</p>
                    <div className='checkbox-data'>
                    <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value=""/> YES
                    </label>

                    <label class="checkbox-inline">
                    <input type="checkbox" value=""/>NO
                    </label>
                </div>
              </div>


              <div class="field address">
                <div class="control">
                  <textarea class="textarea" placeholder="Provide any feedback here"></textarea>
                </div>
              </div>
             

              <div className='survey-btn'>
                <a class="button is-primary"><span className='btn-angle-down'><i class="fas fa-angle-down"></i></span>SUBMIT</a>
              </div>
               
            </div>
          </div>
        </div>
      </div>
    )
  }
  

}
export default SurveyCard 