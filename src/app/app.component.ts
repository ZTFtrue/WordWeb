import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import words from '../assets/word.json';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface Explain {
  "characteristic": string,
  "translate": string
}
interface Word {
  name: string;
  "us"?: string,
  "uk"?: string,
  "explainCN"?: Explain[],
  "explainExtra"?: string,
  children?: Word[];
}

const TREE_DATA: Word[] = words as Word[];

/** Flat node with expandable and level information */
interface WordFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  "us"?: string,
  "uk"?: string,
  "explainCN"?: Explain[],
  "explainExtra"?: string,
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _transformer = (node: Word, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      us: node.us,
      uk: node.uk,
      explainExtra: node.explainExtra,
      explainCN: node.explainCN,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<WordFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: WordFlatNode) => node.expandable;
}
