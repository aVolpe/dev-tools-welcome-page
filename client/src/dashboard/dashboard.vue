<template>
    <div>
        <div class="container">
            <div class="row">

            </div>
            <div class="row">
                <div class="col text-left">
                    <h1>Your projects</h1>
                </div>
            </div>

            <div class="row pt-4">
                <project 
                    v-for="project in projects"
                    v-bind:project="project"
                    v-bind:key="project.id">
                </project>
            </div>
        </div>
    </div>
</template>

<style>

</style>

<script>

import Project from '@/project/project.vue';

export default {
    data: function() {
        return {
            projects: [
                { id:0, name : 'tembolo' },
                { id:1, name : 'tembolo2' },
                { id:2, name : 'tembolo3' }
            ]
        }
    },
    methods: {
    },
    components: {
        'project': Project
    }
}
</script>

