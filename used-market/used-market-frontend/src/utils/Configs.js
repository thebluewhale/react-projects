class Configs {
    constructor() {
        this.category = [
            '부동산', '전자제품', '가구', '의류/섬유', '기타'
        ];
        this.categoryColor = {
            'BLOG' : {
                materializeColor: 'blue lighten-3',
                RGBColor: '#90caf9'
            },
            'JavaScript' : {
                materializeColor: 'lime lighten-1',
                RGBColor: '#d4e157'
            },
            'Algorythm' : {
                materializeColor: 'brown lighten-2',
                RGBColor: '#a1887f'
            },
            'C/C++' : {
                materializeColor: 'pink lighten-4',
                RGBColor: '#f8bbd0'
            },
            'ComputerScience' : {
                materializeColor: 'deep-purple lighten-3',
                RGBColor: '#b39ddb'
            }
        };
        this.getCategory = this.getCategory.bind(this);
        this.getCategoryColorObject = this.getCategoryColorObject.bind(this);
        this.getCategoryMaterilizeColor = this.getCategoryMaterilizeColor.bind(this);
        this.getCategoryRGBColor = this.getCategoryRGBColor.bind(this);
    }

    getCategory() {
        return this.category;
    }

    getCategoryCount() {
        return this.category.length;
    }

    getCategoryColorObject() {
        return this.categoryColor;
    }

    getCategoryMaterilizeColor(category) {
        if (!this.categoryColor.hasOwnProperty(category)) {
            return 'teal';
        }
        return this.categoryColor[category].materializeColor;
    }

    getCategoryRGBColor(category) {
        if (!this.categoryColor.hasOwnProperty(category)) {
            return 'teal';
        }
        return this.categoryColor[category].RGBColor;
    }
}

export default new Configs();
