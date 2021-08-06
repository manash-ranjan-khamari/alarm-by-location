Vue.component('header-component', {
    template: '<p>This is a header</p>'
});
Vue.use(Vuetable);

var app = new Vue({
    el: '#app',
    data: {
        headerMessage: 'Hello Calipsa!',
        fields: ['location', 'outcome','datetime'],
        startDateTime: '',
        endDateTime: '',
        error: ''
    },
    components:{
        'vuetable-pagination': Vuetable.VuetablePagination
    },
    methods: {
        onPaginationData (paginationData) {
            this.$refs.pagination.setPaginationData(paginationData)
        },
        onChangePage (page) {
            this.$refs.vuetable.changePage(page)
        },
        async filterData() {
            const requestUrl = `/api/events/?sort=&page=1&per_page=50${this.startDateTime ? `&startTime=${this.startDateTime}`: ''}${this.startDateTime ? `&endTime=${this.endDateTime}`: ''}`;
            try {
                const response = await axios.get(requestUrl);

                if (response.status === 200) {
                    Vue.nextTick( () => {
                        const paginationObj = {
                            total: response?.data?.total,
                            per_page: response?.data?.per_page,
                            current_page: 1,
                            last_page: response?.data?.last_page,
                            next_page_url: response?.data?.next_page_url,
                            prev_page_url: response?.data?.prev_page_url,
                            from: response?.data?.from,
                            to: response?.data?.to
                        };

                        this.$refs.vuetable.resetData();
                        this.$refs.vuetable.setData(response?.data?.data);
                        this.$refs.vuetable.tablePagination = paginationObj;
                        this.$refs.pagination.setPaginationData(paginationObj)
                        this.$refs.vuetable.refresh();
                    })
                } else {
                    this.error = 'Invalid Input';
                }
            } catch (err) {
                this.error = 'Invalid Input';
            }
        },
    }
});

