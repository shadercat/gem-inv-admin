import axios from 'axios'
export const getPlans = ()=>{
  return axios.get("/admin/plan").then(resp => {
      return resp.data;
  }).catch(err => {
      return {errors: err}
  });
};

export const postPlan = (data) => {
    return axios.post("/admin/plan", data).then(resp => {
        return resp.data;
    }).catch(err =>
    {
        return {errors:err}
    })
};

export const deletePlan = (id) => {
  console.log(id);
  return axios.delete("https://geminv.herokuapp.com/admin/plan/" + id).then(res => {
    return res.data;
  }).catch(err => {
    return {errors: err};
  })
}
