<template>
<div id="flatbondid" class="mt-5" v-cloak>
<a href="/" class="btn btn-primary mt-2">Go back to Create FlatBond</a>
    <div class="row">
        <div v-for="bond in flatbond.flatbond" class="col-12 text-center">
                    <p v-if="bond.postcode"> <span>Your PostCode= </span>{{ bond.postcode }}</p>
                    <p> <span>The Membership Including VAT= </span>£{{ bond.membership_fee }}</p>
                    <p><span v-if="!bond.is_monthly">Your weekly</span><span v-if="bond.is_monthly">Your monthly</span> <span> Rent = </span>£{{ bond.rent }}</p>
                    <p>is it Fixed Membership fee? = <span v-if="bond.fixed_memebership_fee == true">YES</span><span v-else>NO</span></p>
                       <hr>     
        </div>
    </div>



</div>
</template>

<script>
export default {
    data() {
        return{
            
        }
        
    },
    computed: {
        flatbond(){
            return this.$store.getters.getFlatbondList;
        }
    },
    created: function() {
        this.$store.dispatch("getflatbond");
    },
    methods: {

    },
}
</script>