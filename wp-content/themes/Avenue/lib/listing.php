<div class="search-blocks hidden">
  <div class="container">
    <form action="#" method="POST">
      <div class="rows clearfix">
        <div class="col-xs-12 col-sm-4 col-md-3">
          <div class="form-group">
            <input type="text" class="input-sm" placeholder="Keywords" />
          </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3">
          <div class="form-group">
            <select name="location" class="form-control" data-custom-select>
              <option value="all"> Any location </option>
              <option value="new-york"> District 1 </option>
              <option value="new-jersey"> District 2 </option>
              <option value="new-jersey"> District 3 </option>
              <option value="new-jersey"> District 4 </option>
              <option value="new-jersey"> District 5 </option>
              <option value="new-jersey"> District 6 </option>
              <option value="new-jersey"> District 7 </option>
              <option value="new-jersey"> District 8 </option>
              <option value="new-jersey"> District 9 </option>
              <option value="new-jersey"> District 10 </option>
              <option value="new-jersey"> District 11 </option>
              <option value="new-jersey"> District 12 </option>
            </select>
            <?php ?>
          </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3">
          <div class="form-group">
            <select name="location" class="form-control" data-custom-select>
              <option value="all"> Any sub location </option>
              <option value="state-island"> State Island </option>
              <option value="brookyln"> Brookyln </option>
              <option value="queens"> Queens </option>
              <option value="manhattan"> Manhattan </option>
            </select>
            <?php ?>
          </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3">
          <div class="form-group">
            <select name="status" class="form-control" data-custom-select>
              <option value="all">Any Status</option>
              <option value="rent"> Rent </option>
              <option value="open-house"> Open house </option>
              <option value="sold"> Sold </option>
              <option value="all"> Sale </option>
            </select>
          </div>
        </div>
      </div>
      <div class="rows clearfix">
        <div class="col-xs-12 col-sm-4 col-md-3">
          <div class="form-group">
            <select name="type" class="form-control" data-custom-select>
              <option value="all"> Any Type </option>
              <option value="co-op"> Co-op </option>
              <option value="condo"> Condo </option>
              <option value="single-family-home"> Single Family Home </option>
              <option value="apartment"> Apartment </option>
            </select>
          </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3">
          <div class="form-group">
            <input type="range" name="points" min="0" max="10" />
          </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3">
          <div class="form-group">
           <input type="range" name="points" min="0" max="10" />
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
