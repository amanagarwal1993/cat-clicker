var model = {
    
    cats: [],
    current_cat: {},
    
    init: function() {
        localStorage.clear();
        model.cats = [
                {
                    id: 'cat1',
                    name: 'Tom',
                    url: 'http://placekitten.com/601/350',
                    clicks: 0
                },

                {
                    id: 'cat2',
                    name: 'Jerry',
                    url: 'http://placekitten.com/602/350',
                    clicks: 0
                },

                {
                    id: 'cat3',
                    name: 'Rally',
                    url: 'http://placekitten.com/603/350',
                    clicks: 0
                },

                {
                    id: 'cat4',
                    name: 'Lex',
                    url: 'http://placekitten.com/604/350',
                    clicks: 0
                },

                {
                    id: 'cat5',
                    name: 'Manoj',
                    url: 'http://placekitten.com/605/361',
                    clicks: 0
                }
            ];
        
        model.current_cat = model.cats[0];
    },

    getAllCats: function() {
        return model.cats;
    },

    getCat: function(cat_id) {
        var cats = model.cats;
        for (var k=0; k<cats.length; k++) {
            if (cats[k].id == cat_id) {
                return cats[k];
            }
        };

        return {};
    },

    update: function(cat_id) {
        for (var k=0; k<model.cats.length; k++) {
            if (model.cats[k].id == cat_id) {
                index = k;
                //console.log(index);
                break;
            }
        };
        model.cats[index].clicks += 1;
        return;
        
    },

    updateCat: function(newname, newurl, newclicks) {
        var cat_id = model.current_cat.id;
        for (var k=0; k<model.cats.length; k++) {
            if (model.cats[k].id == cat_id) {
                model.cats[k].name = newname;
                model.cats[k].url = newurl;
                model.cats[k].clicks = newclicks;
            };
        };
        return;
    }
}


var octopus = {

    init: function() {
        model.init();
        listView.render_cats_list();
        catView.show_cat(model.getAllCats()[0]);
    },

    update_clicks: function(cat_id) {
        model.update(cat_id);
        catView.show_cat();
    },
    
    getCats: function() {
        return model.getAllCats();
    },
    
    getCurrent: function() {
        return model.current_cat;
    },
    
    setCurrent: function(cat_id) {
        model.current_cat = model.getCat(cat_id);
        return;
    },
    
    update_cat: function(name, url, clicks) {
        model.updateCat(name, url, clicks);
        listView.render_cats_list();
        catView.show_cat();
        adminView.render_form();
        return;
    }
};


var listView = {
    render_cats_list: function() {
        cats = octopus.getCats();

        $('#cats').empty();

        for(var i=0; i<cats.length; i++) {
            var cat = cats[i];
            var list = document.createElement('li');
            var lista = document.createElement('a');
            lista.textContent = cat.name;
            lista.href = '#'
            list.classList.add('cat');
            lista.classList.add(cat.id);
            
            lista.addEventListener('click', function() {
                var cat_id = $(this).attr('class');
                octopus.setCurrent(cat_id);
                catView.show_cat();
            });
            
            list.append(lista);
            $('#cats').append(list);
        };
        return;
    }
}

var catView = {
    
    show_cat: function() {
        var div = document.getElementById('current-cat');
        
        while(div.firstChild) {
            div.removeChild(div.firstChild);
        };
        
        var cat = octopus.getCurrent();
        
        var h2 = document.createElement('h2');
        h2.textContent = cat.name;
        
        var a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('id', cat.id);
        a.addEventListener('click', function() {
            octopus.update_clicks(this.id);
        });
        
        var image = document.createElement('img');
        image.setAttribute('src', cat.url);
        a.appendChild(image);
        
        var p = document.createElement('p');
        p.setAttribute('id', 'clicks');
        p.textContent = String(cat.clicks);
        
        div.appendChild(h2);
        div.appendChild(a);
        div.appendChild(p);
        
        var old_button = document.getElementById('admin-button');
        var new_button = old_button.cloneNode(true);
        old_button.parentNode.replaceChild(new_button, old_button);
        new_button.addEventListener('click', adminView.render_form);
    }
};

var adminView = {
    admin_mode: false,
    
    render_form: function() {
        
        if (adminView.admin_mode == false) {
            adminView.admin_mode = true;
            var cat = octopus.getCurrent();
            var form = document.getElementById('edit-cat');
            form.style = 'display: block';
            
            new_name = document.getElementById('new-name');
            new_url = document.getElementById('new-url');
            new_clicks = document.getElementById('new-clicks');
            cancel_button = document.getElementById('cancel');
            submit_button = document.getElementById('submit');
            
            new_name.setAttribute('value', cat.name);
            new_url.setAttribute('value', cat.url);
            
            cancel_button.addEventListener('click', adminView.render_form);
            form.addEventListener('submit', adminView.send_updates);
        }
        
        else {
            var form = document.getElementById('edit-cat');
            form.style = 'display: NONE';
            adminView.admin_mode = false;
        };
        
        return;
    },
    
    send_updates: function() {
        console.log('send!');
        //octopus.update_cat();

        name = $('#new-name').val();
        url = $('#new-url').val();
        clicks = parseInt($('#new-clicks').val());
        if (!clicks)
            clicks = octopus.getCurrent().clicks;
        
        console.log(name, url, clicks);
        octopus.update_cat(name, url, clicks);
    }
    
}

octopus.init();


