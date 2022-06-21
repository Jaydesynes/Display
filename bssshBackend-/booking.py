
  
import services
import job_que
 

def book(service_id,patient_no): 
    data = services.get_consultants(service_id) ## This gets all the available consultants offering this service
    consultants = data["Consultants"]
    free_consultant={000:0}
    for consultant in consultants:
        key = list(free_consultant.keys())[0]
        if consultants[consultant]>free_consultant[key]:
            free_consultant = {consultant:consultants[consultant]}
    userid = list(free_consultant.keys())[0]
    job_que.add(service_id,userid,patient_no) ## This function searches for the user_id and adds the patient_no to the number of patients
    return f"Consultant {userid} is handling this task"