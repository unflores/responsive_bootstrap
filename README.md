### Widget Time

This will create a little widget with a button that sends the user and some information over to the travelavenue login page.

```
<div>
  lots of sexy html


  <script>
    _ta = typeof _ta == 'undefined' ? {} : _ta;
    _ta.product = {
      title: 'some title',
      description: 'here is a small description about the product hopefully',
      address: '1024 some address',
      telephone: '123-456-7890',
      product_id: '123456',
      affiliate_type: 'affiliate_name'
    }
  </script>

  <script src='travelavenue-trip-widget.js' data-environment='development' type='text/javascript'></script>
</div>
```

You can pass data-environment into the script to get differing environments, [development, staging, production], or leave it blank for production.
