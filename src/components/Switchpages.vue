<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pages.has_pre}"
        @click.prevent="changepages(pages.current_page-1)">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pages.total_pages" :key="page"
          :class="{'active': pages.current_page === page}" @click.prevent="changepages(page)">
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pages.has_next}"
        @click.prevent="changepages(pages.current_page+1)">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    changepages(page){
      this.$emit('switch',page)
    }
  }
}
</script>
