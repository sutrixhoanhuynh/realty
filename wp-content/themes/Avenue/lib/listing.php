<div class="search-blocks">
  <div class="container">
    <form action="#" method="POST">
      <div class="rows">
        <div class="col-xs-12 col-sm-4 col-md-3">
          <div class="form-group">
            <select name="location" class="form-control">
              <option value="all"> Any location </option>
              <?php
                // $locations = get_terms('location', array('hide_empty' => false));
                // foreach($locations as $location) {
                //   echo '<option value="'.$location->term_id.'">'.$location->name.'<option>';
                // }
              ?>
            </select>
            <?php ?>
          </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3">
          <div class="form-group">
            <select name="status" class="form-control">
              <option value="all">Any Status</option>
            </select>
          </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3">
          <div class="form-group">
            <select name="type" class="form-control">
              <option value="all"> Any Type </option>
            </select>
          </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3">
          <button type="submit" class="btn btn-info search-btn">
            Search
          </button>
        </div>
      </div>
    </form>
  </div>

  <!-- <p class="listin"><span>Location</span><br/><?php // the_dropdown_taxonomy('location'); ?></p>
  <p class="listir"><span>Property type</span><br/><?php the_dropdown_taxonomy('property'); ?></p>
  <p class="listin"><span>Square feet Area</span><br/><?php the_dropdown_taxonomy('area'); ?></p>
  <p class="listir"><span>Bedrooms</span><br/><?php the_dropdown_taxonomy('bedrooms'); ?></p>
  <p class="listin"><span>Type of listing</span><br/><?php the_dropdown_taxonomy('type'); ?></p>
  <p class="listir"><span>Price range</span><br/><?php // the_dropdown_taxonomy('range'); ?></p> -->
</div>
