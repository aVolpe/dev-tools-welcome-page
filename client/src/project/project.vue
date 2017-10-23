<template>
    <div class="col-6 col-md-3">
        {{ project.name }}

    </div>
</template>

<style>

</style>

<script>

export default {
    data: function() {
        return {
            name : "test"
        }
    },
    methods: {
    },
    props: [ 'project' ]
}
</script>


