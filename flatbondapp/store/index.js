export const state = () => ({
    flatbond: {}
  })

  export const getters ={
      getFlatbondList: state => state.flatbond
  }

export const mutations ={
    setFlatbond(state, payload){
        state.flatbond  = payload
    }
}
export const actions = {

    postForm({commit}, payload ){
        this.$axios.post('flatbond', payload).then( success => {
            console.log('Hello :D worked');
        }).catch( err => {
            console.log(err)
        })

    },

    getflatbond({commit}) {
        this.$axios.get('flatbond').then( success =>{
            console.log("worked")
            commit('setFlatbond', success.data)
        }).catch( error=>{
            console.log("fucked")
        })
    },
}
