<template>
  <section class="container">
  <div class="mt-5" id="flatform" v-cloak>
<form id="flatbondform" method="POST">
      
    <div class="form-check mb-4">
    <input type="checkbox" name="is_monthly" class="form-check-input" v-model="monthlyCheck" :disabled="disableSubmit == true">
        <label class="form-check-label" for="fixedvalue">Tick the box if the rent is monthly</label>
    </div>
    <div  class="form-group">
      <label v-if="!monthlyCheck" for="rentamount">Please enter Weekly rent amount</label>
      <label v-if="monthlyCheck" for="rentamount">Please enter Monthly rent amount</label>
      <input type="number" name="rent" class="form-control" id="rentamount"  :placeholder="placeholderText" v-model="calculatedFee" :disabled="disableSubmit == true">
      <small v-if="!monthlyCheck" class="form-text text-muted">minimum amount is £25 per week and £2000 per week</small>
      <small v-if="monthlyCheck" class="form-text text-muted">minimum amount is £110 per month and £8660 per month</small>
    </div>
    <div
    v class="form-group text-center">
            <p v-if="calculatedFee > 100" class="mb-0">Your Memberhip Fee after 20% TAX is = <span style="font-weight:700; color:blue">{{ getFee }}</span></p>
            <p v-else-if="calculatedFee == 0" class="mb-0">There is noting to Pay</p>
            <p v-else class="mb-0">The set fee is = <span style="font-weight:700; color:blue">£120</span></p>
            <small id="rentHelp" class="form-text text-muted">If Rent is less than £100 - The set fee is £120</small>
    </div>
    <div class="form-group">
      <label for="postcodefield">Please enter your Postcode</label>
      <input type="text" name="postcode" v-model="postcode" class="form-control" id="postcodefield" placeholder="postcode" :disabled="disableSubmit == true">
    </div>
    <div class="form-check">
      <input type="checkbox" name="fixed_memebership_fee" class="form-check-input" id="fixedvalue" :disabled="disableSubmit == true">
      <label class="form-check-label" for="fixedvalue">Is it a Fixed fee?</label>
    </div>
    
  </form>
  <div>
        <button v-on:click="submitForm()" class="btn btn-primary" :disabled="disableSubmit || 
                                                                (!monthlyCheck && Number(calculatedFee) < 25 || Number(calculatedFee) > 2000) ||
                                                                (monthlyCheck && Number(calculatedFee) < 110 || Number(calculatedFee) > 8660)">Submit</button> 
        <a :href="/flatbond/" class="btn btn-primary" id="listBtn">Flatbond List</a>
        <button v-on:click="resetBtn()" v-show="!hideReset" class="btn btn-success">Restart ?</button> 
  </div>
  <div v-if="result" class="jumbotron mt-4 text-center">

        <p><span v-if="!monthlyCheck">Your weekly Rent will cost:</span> <span v-if="monthlyCheck">Your monthly Rent will cost:</span> <span v-if="result.rent">£</span>{{ result.rent }}</p>
        <p v-if="!result.fixed_memebership_fee">Fee charges: <span v-if="result.membership_fee">Your Membership fee cost: £</span>{{ result.membership_fee}}</p>
        <p v-if="result.fixed_memebership_fee==true">Fee Charges: <span v-if="result.fixed_memebership_fee_amount">Your Fixed Membership fee amount cost: £</span>{{ result.fixed_memebership_fee_amount}}</p>
        <p>Your PostCode: {{result.postcode }}</p>
  </div> 

</div>


  </section>
</template>

<script>


export default {
  components: {

  },
  data(){
    return{
        calculatedFee:'',
        result:{},
        disableSubmit: false,
        postcode:'',
        hideReset: true,
        monthlyCheck: false
    }
    },
    computed: {
        getFee: function(){
          let  getTax = (this.calculatedFee * 20) / 100;
           let totalfee = +this.calculatedFee + +getTax;
            return totalfee; 
        },
        placeholderText: function() {
            if (!this.monthlyCheck) {
                return 'Minimum amount £25 and Maximum amount £2000';
            }
            if (this.monthlyCheck) {
                return 'Minimum amount £110 and Maximum amount £8660';
            }
        },
    },
  
  methods: {

    submitForm: function(callback) {
        let data = {
          rent:this.calculatedFee,
          postcode:this.postcode
        }

        // let self = this;
        this.$store.dispatch("postForm", data)
        },
        resetBtn: function(){
            this.disableSubmit = false;
            this.hideReset = true;
        }
    },
}
</script>


