class PopularMoviesResponse {
    constructor(props) {
        const {
            page,
            results,
            total_results,
            total_pages
        } = props

        this.page = page;
        this.results = results;
        this.total_results = total_results;
        this.total_pages = total_pages
    }
}

export default PopularMoviesResponse
